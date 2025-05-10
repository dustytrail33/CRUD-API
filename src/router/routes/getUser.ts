import { ServerResponse } from 'http';
import USERS from '../../db/db';
import sendData from '../../utils/sendData';

const getUser = (res: ServerResponse, userId: string) => {
  const foundedUser = USERS.find((user) => user.id === userId);

  if (!foundedUser) return sendData({ error: 'User not found' }, res, 404);
  return sendData(foundedUser, res, 200);
};

export default getUser;
