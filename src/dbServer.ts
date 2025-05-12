import http from 'http';
import * as dotenv from 'dotenv';
import router from './router';
import { handleError } from './utils/handleError';

dotenv.config();

const PORT = Number(process.env.DB_PORT) || Number(process.env.PORT) || 3000;

if (isNaN(PORT) || PORT <= 0) {
  console.log('Wrong port');
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
  console.log(`DB Server listening on port ${PORT}`);
});
