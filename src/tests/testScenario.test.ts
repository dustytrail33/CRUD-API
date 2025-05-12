import { IncomingMessage, ServerResponse } from 'http';
import getUsers from '../router/routes/getUsers';
import createUser from '../router/routes/createUser';
import getUser from '../router/routes/getUser';
import changeUser from '../router/routes/changeUser';
import deleteUser from '../router/routes/deleteUser';
import USERS from '../db/db';

describe('Full user API flow scenario', () => {
  let mockRes: jest.Mocked<ServerResponse>;
  let mockReq: Partial<IncomingMessage>;

  beforeEach(() => {
    mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    } as unknown as jest.Mocked<ServerResponse>;

    mockReq = {} as unknown as Partial<IncomingMessage>;
    USERS.length = 0;
  });

  const mockJsonBody = (data: object) => {
    const body = JSON.stringify(data);
    mockReq[Symbol.asyncIterator] = async function* () {
      yield Buffer.from(body);
    };
  };

  test('CRUD scenario', async () => {
    // get users
    await getUsers(mockRes);
    expect(mockRes.end).toHaveBeenCalledWith('[]');

    // create user
    const userData = { username: 'Test', age: 30, hobbies: ['test'] };
    mockJsonBody(userData);
    await createUser(mockReq as IncomingMessage, mockRes);
    const createdUser = USERS[0];
    expect(createdUser.username).toBe('Test');

    // get users with 1 user
    await getUsers(mockRes);
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify([createdUser]));

    // get user bu id
    await getUser(mockRes, createdUser.id);
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(createdUser));

    // update user
    const updatedData = { username: 'Updated', age: 35, hobbies: ['test'] };
    mockJsonBody(updatedData);
    await changeUser(mockReq as IncomingMessage, mockRes, createdUser.id);
    const updatedUser = USERS[0];
    expect(updatedUser.username).toBe('Updated');

    // delete user
    await deleteUser(mockRes, createdUser.id);
    expect(USERS.length).toBe(0);

    // get user by id
    await getUser(mockRes, createdUser.id);
    expect(mockRes.writeHead).toHaveBeenCalledWith(404, {
      'Content-Type': 'application/json',
    });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ error: 'User not found' }));
  });
});
