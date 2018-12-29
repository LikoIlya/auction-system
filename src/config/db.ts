import { ConnectionOptions } from 'typeorm';

import { Auction } from '../entity/Auction';
import { Bid } from '../entity/Bid';
import { User } from '../entity/User';

export const generateDbConfig = (config: any) => {
  const {
    DATABASE_URL,
    REDIS_URL
  } = config;

  const dbConfig: ConnectionOptions = {
    type: 'postgres',
    url: DATABASE_URL,
    entities: [User, Auction, Bid],
    synchronize: true,
    cache: {
      type: 'redis',
      options: {
        url: REDIS_URL
      },
    },
  };
  return dbConfig;
};
