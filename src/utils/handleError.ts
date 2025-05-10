import { ServerResponse } from 'http';
import sendData from './sendData';

export function handleError(res: ServerResponse, err: unknown) {
  console.log('Error:', err);
  sendData({ error: 'Internal Server Error' }, res, 500);
}
