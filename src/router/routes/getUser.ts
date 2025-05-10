import { ServerResponse } from 'http';
import USERS from '../../db/db';
import sendData from '../../utils/sendData';
import { validate } from 'uuid';

const getUser = (res: ServerResponse, userId: string) => {
  if (!validate(userId)) return sendData({ error: 'Invalid userId' }, res, 400);

  const foundUser = USERS.find((user) => user.id === userId);

  if (!foundUser) return sendData({ error: 'User not found' }, res, 404);

  return sendData(foundUser, res, 200);
};

export default getUser;
