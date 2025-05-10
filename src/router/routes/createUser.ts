import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import parseBody from '../../utils/parseBody';
import sendData from '../../utils/sendData';
import { IUser } from '../../types';
import USERS from '../../db/db';

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data = await parseBody(req);

    if (!data?.username || !data?.age || !data?.hobbies || !Array.isArray(data?.hobbies)) {
      return sendData({ error: 'Invalid user data' }, res, 400);
    }

    const newUser: IUser = {
      id: uuidv4(),
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    USERS.push(newUser);
    return sendData(newUser, res, 201);
  } catch {
    return sendData({ error: 'Invalid Data' }, res, 400);
  }
};

export default createUser;
