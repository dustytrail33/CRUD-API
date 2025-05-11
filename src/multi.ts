import cluster from 'cluster';
import os from 'os';
import path from 'path';
import { fork } from 'child_process';
import http, { request } from 'http';
import * as dotenv from 'dotenv';
import startCluster from './startCluster';

dotenv.config();

const BASE_PORT = Number(process.env.PORT) || 4000;
const DB_PORT = process.env.DB_PORT || 5000;

const totalCpus = os.cpus().length;
const workerCount = Math.max(totalCpus - 1, 1);
const workerPorts: number[] = [];

if (cluster.isPrimary) {
  const dbScript = path.resolve(__dirname, 'dbServer.js');
  const dbProc = fork(dbScript, { env: { ...process.env, PORT: String(DB_PORT) } });
  dbProc.on('exit', (code) => console.log(`DB server exited with code ${code}`));

  const portsMap = new Map<number, number>();

  for (let i = 1; i <= workerCount; i++) {
    const port = BASE_PORT + i;
    const worker = cluster.fork({ CLUSTER_PORT: port.toString(), PORT: process.env.PORT });
    workerPorts.push(port);
    portsMap.set(worker.id, port);
  }
  
  let current = 0;

  const balancer = http.createServer((req, res) => {
    const targetPort = workerPorts[current];
    console.log(`Proxying ${req.method} ${req.url} → port:${targetPort}`);
    current = (current + 1) % workerPorts.length;

    const proxy = request(
      { hostname: '127.0.0.1', port: targetPort, path: req.url, method: req.method, headers: req.headers },
      (workerRes) => {
        res.writeHead(workerRes.statusCode ?? 500, workerRes.headers);
        workerRes.pipe(res);
      },
    );
    proxy.on('error', (err) => {
      console.error('Balancer proxy error:', err);
      res.writeHead(502);
      res.end('Bad gateway');
    });
    req.pipe(proxy);
  });

  balancer.listen(BASE_PORT, () => console.log(`Balancer listening on port ${BASE_PORT}`));

  cluster.on('exit', (worker) => {
    const port = portsMap.get(worker.id);
    console.warn(`Worker ${worker.id} on port ${port} died, restarting…`);
    portsMap.delete(worker.id);
    if (port) {
      const newWorker = cluster.fork({ CLUSTER_PORT: port.toString() });
      portsMap.set(newWorker.id, port);
    }
  });
} else {
  const port = Number(process.env.CLUSTER_PORT);
  startCluster(port);
}
