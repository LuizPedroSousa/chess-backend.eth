import corsOrigin from 'cors';
import { CorsOriginException } from '../shared/infra/exceptions/CorsOriginException';

const allowedOrigins = ['http://192.168.10.39:3000', 'https://localhost:3001'];

const cors = corsOrigin({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new CorsOriginException(origin), false);
    }

    return callback(null, true);
  },
  credentials: true,
});

export { cors };
