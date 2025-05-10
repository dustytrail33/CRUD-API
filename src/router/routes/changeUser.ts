import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import sendData from '../../utils/sendData';
import USERS from '../../db/db';
import parseBody from '../../utils/parseBody';
import { IUser } from '../../types';

const changeUser = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!validate(userId)) return sendData({ error: 'Invalid userId' }, res, 400);

  const foundUser = USERS.find((user) => user.id === userId);

  if (!foundUser) return sendData({ error: 'User not found' }, res, 404);

  try {
    const data = await parseBody(req);

    if (!data?.username || !data?.age || !data?.hobbies || !Array.isArray(data?.hobbies)) {
      return sendData({ error: 'Invalid user data' }, res, 400);
    }

    const newUser: IUser = {
      id: foundUser.id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };
    const userIndex = USERS.indexOf(foundUser);
    USERS.splice(userIndex, 1, newUser);
    return sendData(newUser, res, 200);
  } catch {
    return sendData({ error: 'Invalid Data' }, res, 400);
  }
};

export default changeUser;
