import { ServerResponse } from 'http';
import USERS from '../../db/db';
import sendData from '../../utils/sendData';

const getUsers = async (res: ServerResponse) => {
  sendData(USERS, res, 200);
};

export default getUsers;
