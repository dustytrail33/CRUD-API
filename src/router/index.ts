import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getUsers from './routes/getUsers';
import notFound from './routes/notFound';
import getUser from './routes/getUser';
import createUser from './routes/createUser';
import changeUser from './routes/changeUser';
import deleteUser from './routes/deleteUser';

const router = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url ? parse(req.url, true) : parse('', true);
  const method = req.method;
  const matchId = url.pathname?.match(/^\/users\/(.+)$/);
  
  if (url.pathname === '/users' && method === 'GET') {
    return await getUsers(res);
  }

  if (url.pathname === '/users' && method === 'POST') {
    return await createUser(req, res);
  }

  if (matchId && method === 'GET') {
    const userId = matchId[1];
    return getUser(res, userId);
  }

  if (matchId && method === 'PUT') {
    const userId = matchId[1];
    return await changeUser(req, res, userId);
  }

  if (matchId && method === 'DELETE') {
    const userId = matchId[1];
    return await deleteUser(res, userId);
  }

  return notFound(res);
};

export default router;
