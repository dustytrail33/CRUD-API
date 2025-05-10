import { ServerResponse } from 'http';
import { validate } from 'uuid';
import sendData from '../../utils/sendData';
import USERS from '../../db/db';

const deleteUser = async (res: ServerResponse, userId: string) => {
  if (!validate(userId)) return sendData({ error: 'Invalid userId' }, res, 400);

  const foundUser = USERS.find((user) => user.id === userId);

  if (!foundUser) return sendData({ error: 'User not found' }, res, 404);

  try {
    const userIndex = USERS.indexOf(foundUser);
    USERS.splice(userIndex, 1);
    return sendData(null, res, 204);
  } catch {
    return sendData({ error: 'Invalid Data' }, res, 400);
  }
};

export default deleteUser;
