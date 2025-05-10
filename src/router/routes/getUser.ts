import { ServerResponse } from 'http';
import USERS from '../../db/db';
import sendData from '../../utils/sendData';
import { validate } from 'uuid';

const getUser = (res: ServerResponse, userId: string) => {
  if (!validate(userId)) return sendData({ error: 'Invalid userId' }, res, 400);

  const foundedUser = USERS.find((user) => user.id === userId);

  if (!foundedUser) return sendData({ error: 'User not found' }, res, 404);

  return sendData(foundedUser, res, 200);
};

export default getUser;
