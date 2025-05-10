import { IncomingMessage } from 'http';

const parseBody = async (req: IncomingMessage) => {
  let body = '';

  for await (const chunk of req) body += chunk;
  try {
    return JSON.parse(body);
  } catch {
    throw new Error('Invalid JSON');
  }
};

export default parseBody;
