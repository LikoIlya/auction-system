import { ConnectionOptions } from 'typeorm';

import { Auction } from '../entity/Auction';
import { Bid } from '../entity/Bid';
import { User } from '../entity/User';

export const generateDbConfig = (config: any) => {
  const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    REDIS_HOST,
    REDIS_PORT,
  } = config;

  const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    entities: [User, Auction, Bid],
    synchronize: true,
    cache: {
      type: 'redis',
      options: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    },
  };
  return dbConfig;
};
