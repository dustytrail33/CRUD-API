import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import getUsers from './routes/getUsers';
import notFound from './routes/notFound';

const router = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url ? parse(req.url, true) : parse('', true);
  const method = req.method;
  
  if (url.pathname === '/users' && method === 'GET') {
    return await getUsers(res);
  }

  return notFound(res);
};

export default router;
