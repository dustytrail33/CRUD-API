import { IncomingMessage, ServerResponse } from 'http';
import getUsers from '../router/routes/getUsers';
import createUser from '../router/routes/createUser';
import USERS from '../db/db';
import changeUser from '../router/routes/changeUser';
import deleteUser from '../router/routes/deleteUser';
import getUser from '../router/routes/getUser';

jest.mock('uuid', () => ({
  validate: (id: string) => id === 'mocked-user-id' || id === 'not-exist-user',
  v4: () => 'mocked-user-id',
}));

jest.mock('../db/db', () => {
  const USERS = [
    {
      id: 'mocked-user-id',
      username: 'Test',
      age: 99,
      hobbies: ['test'],
    },
  ];
  return {
    __esModule: true,
    default: USERS,
  };
});

const testData = {
  username: 'Test',
  age: 100,
  hobbies: ['test'],
};

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

  test('Create user: should create a user and return 201', async () => {
    mockJsonBody(testData);

    await createUser(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(USERS[USERS.length - 1]).toMatchObject({ id: 'mocked-user-id', ...testData });
    expect(mockRes.writeHead).toHaveBeenCalledWith(201, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify({ id: 'mocked-user-id', ...testData }));
  });

  test('Create user: should return 400 if data is invalid', async () => {
    mockJsonBody({ username: 'Test' });

    await createUser(mockReq as IncomingMessage, mockRes as ServerResponse);

    expect(mockRes.writeHead).toHaveBeenCalledWith(400, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('Invalid user data'));
  });

  test('Get user: should return a user by id', async () => {
    await getUser(mockRes, 'mocked-user-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(USERS[0]));
  });

  test('Get user: invalid UUID should return 400', async () => {
    await getUser(mockRes, 'invalid-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(400, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('Invalid userId'));
  });

  test('Get user: unknown user should return 404', async () => {
    await getUser(mockRes, 'not-exist-user');
    expect(mockRes.writeHead).toHaveBeenCalledWith(404, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('User not found'));
  });

  test('Update user: should update a user', async () => {
    mockJsonBody(testData);
    await changeUser(mockReq as IncomingMessage, mockRes as ServerResponse, 'mocked-user-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    expect(mockRes.end).toHaveBeenCalledWith(expect.stringContaining('test'));
  });

  test('Update user: invalid UUID should return 400', async () => {
    mockJsonBody(testData);
    await changeUser(mockReq as IncomingMessage, mockRes, 'invalid-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(400, { 'Content-Type': 'application/json' });
  });

  test('Update user: unknown user should return 404', async () => {
    mockJsonBody(testData);
    await changeUser(mockReq as IncomingMessage, mockRes, 'not-exist-user');
    expect(mockRes.writeHead).toHaveBeenCalledWith(404, { 'Content-Type': 'application/json' });
  });

  test('Delete user: should delete a user', async () => {
    await deleteUser(mockRes, 'mocked-user-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(204);
    expect(mockRes.end).toHaveBeenCalled();
  });

  test('Delete user: invalid UUID should return 400', async () => {
    await deleteUser(mockRes, 'invalid-id');
    expect(mockRes.writeHead).toHaveBeenCalledWith(400, { 'Content-Type': 'application/json' });
  });

  test('Delete user:  unknown user should return 404', async () => {
    await deleteUser(mockRes, 'not-exist-user');
    expect(mockRes.writeHead).toHaveBeenCalledWith(404, { 'Content-Type': 'application/json' });
  });
});
