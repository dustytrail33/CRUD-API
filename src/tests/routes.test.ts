import { IncomingMessage, ServerResponse } from 'http';
import getUsers from '../router/routes/getUsers';
import createUser from '../router/routes/createUser';
import USERS from '../db/db';
import changeUser from '../router/routes/changeUser';
import deleteUser from '../router/routes/deleteUser';

jest.mock('uuid', () => ({
  validate: (id: string) => id === 'mocked-user-id',
  v4: () => 'mocked-user-id',
}));

jest.mock('../db/db', () => {
  const USERS = [
    {
      id: 'mocked-user-id',
      username: 'Test User',
      age: 99,
      hobbies: ['testing'],
    },
  ];
  return {
    __esModule: true,
    default: USERS,
  };
});

describe('User routes unit test', () => {
  let mockRes: jest.Mocked<ServerResponse>;
  let mockReq: Partial<IncomingMessage>;

  beforeEach(() => {
    mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    } as unknown as jest.Mocked<ServerResponse>;

    mockReq = {} as unknown as Partial<IncomingMessage>;
  });

  const mockJsonBody = (data: object) => {
    const body = JSON.stringify(data);
    mockReq[Symbol.asyncIterator] = async function* () {
      yield Buffer.from(body);
    };
  };

  test('Get all users: should respond with all users and status 200', async () => {
    await getUsers(mockRes);
    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
    });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(USERS));
  });

  test('Create user: should return 400 if data is invalid', async () => {
    mockJsonBody({ username: 'John' });

    await createUser(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, { 'Content-Type': 'application/json' });
    expect((mockRes.end as jest.Mock).mock.calls[0][0]).toContain('Invalid user data');
  });

  test('Create user: should create a user and return 201', async () => {
    const userData = {
      username: 'Test',
      age: 100,
      hobbies: ['test'],
    };
    mockJsonBody(userData);

    await createUser(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(USERS[USERS.length - 1]).toMatchObject({ id: 'mocked-user-id', ...userData });
    expect(mockRes.writeHead).toHaveBeenCalledWith(201, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('Test'));
  });

  test('Update user: should update a user', async () => {
    const updatedData = { username: 'Test', age: 100, hobbies: ['test'] };
    mockJsonBody(updatedData);
    await changeUser(mockReq as IncomingMessage, mockRes as ServerResponse, 'mocked-user-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('test'));
  });

  test('Delete user: should delete a user', async () => {
    await deleteUser(mockRes, 'mocked-user-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(204);
    expect(mockRes.end).toHaveBeenCalled();
  });
});
