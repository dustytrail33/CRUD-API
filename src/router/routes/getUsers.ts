import { ServerResponse } from 'http';
import USERS from '../../db/db';

const getUsers = async (res: ServerResponse) => {
  const data = JSON.stringify(USERS);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  });
  res.end(data);
};

export default getUsers;
