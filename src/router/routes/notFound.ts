import { ServerResponse } from 'http';
import sendData from '../../utils/sendData';

const notFound = (res: ServerResponse) => {
  sendData({ error: 'Not found' }, res, 404);
};

export default notFound;
