import { ServerResponse } from 'http';

const sendData = (data: unknown, res: ServerResponse, status: number) => {
  const jsonData = JSON.stringify(data);

  if (data === null) {
    res.writeHead(status);
    res.end();
    return;
  }

  res.writeHead(status, {
    'Content-Type': 'application/json',
  });

  res.end(jsonData);
};

export default sendData;
