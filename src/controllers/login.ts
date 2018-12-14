import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { getManager } from 'typeorm';

import { logger } from '../services/logger';

import { User } from '../entity/User';

export const findByEmail = async (context: Context) => {
  const { email } = context.request.body;
  // get an entity repository to perform operations with entity
  const userRepository = getManager().getRepository(User);

  // load an entity by a given entity id
  const user = await userRepository.findOne({ email });

  if (!user) {
    context.status = 401;
    return;
  }

  logger.info(`User ID ${user.id} Logged in`);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  logger.info(token);

  // return loaded entity
  context.body = { token };
};
