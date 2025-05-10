import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getUsers from './routes/getUsers';
import notFound from './routes/notFound';
import getUser from './routes/getUser';

const router = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url ? parse(req.url, true) : parse('', true);
  const method = req.method;
    console.log(url.pathname);
  if (url.pathname === '/users' && method === 'GET') {
    return await getUsers(res);
  }

  const match = url.pathname?.match(/^\/users\/(.+)$/);
  if (match) {
    const userId = match[1];
    return getUser(res, userId);
  }

  return notFound(res);
};

export default router;
