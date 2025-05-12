import sendData from '../../src/utils/sendData';
import { ServerResponse } from 'http';

describe('sendData', () => {
  let mockRes: jest.Mocked<ServerResponse>;

  beforeEach(() => {
    mockRes = {
      writeHead: jest.fn(),
      end: jest.fn(),
    } as unknown as jest.Mocked<ServerResponse>;
  });

  it('should send JSON data with correct status and headers', () => {
    const data = { message: 'Hello' };

    sendData(data, mockRes, 200);

    expect(mockRes.writeHead).toHaveBeenCalledWith(200, {
      'Content-Type': 'application/json',
    });

    expect(mockRes.end).toHaveBeenCalledWith(JSON.stringify(data));
  });

  it('should send only status code and end if data is null', () => {
    sendData(null, mockRes, 204);

    expect(mockRes.writeHead).toHaveBeenCalledWith(204);
    expect(mockRes.end).toHaveBeenCalledWith();
  });
});
