import http from 'http';
import * as dotenv from 'dotenv';
import router from './router';
import { handleError } from './utils/handleError';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

if (isNaN(PORT) || PORT <= 0) {
  console.log('Wrong port in .env');
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    handleError(res, err);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
