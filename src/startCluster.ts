import http, { request } from 'http';

const DB_PORT = Number(process.env.DB_PORT);
if (isNaN(DB_PORT) || DB_PORT <= 0) {
  console.error('Worker: invalid DB_PORT');
  process.exit(1);
}

export default function startCluster(port: number) {
  const server = http.createServer((req, res) => {
    const proxy = request(
      {
        hostname: '127.0.0.1',
        port: DB_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (dbRes) => {
        res.writeHead(dbRes.statusCode ?? 500, dbRes.headers);
        dbRes.pipe(res);
      },
    );
    proxy.on('error', (err) => {
      console.error('Worker proxy error:', err);
      res.writeHead(502);
      res.end('Bad Gateway');
    });
    req.pipe(proxy);
  });

  server.listen(port, () => {
    console.log(`Worker listening on port ${port}`);
  });
}
