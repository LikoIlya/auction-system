import 'reflect-metadata';

import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as compose from 'koa-compose';
import * as jwt from 'koa-jwt';
import * as morgan from 'koa-morgan';
import * as respond from 'koa-respond';
import * as serve from 'koa-static';
import * as path from 'path';
import { createConnection } from 'typeorm';

import { envVars, generateDbConfig } from './config';
import { errorHandler } from './middleware/error-handler';
import * as v1Router from './routes/v1';
import { accessLogStream, logger } from './services/logger';

export const loadApp = () => {
  const app = new Koa();
  const secret = envVars.JWT_SECRET;

   app.use(serve(path.join(__dirname, "../static")));

  /* Global Middlewares */
  const middlewares = [
    morgan('combined', { stream: accessLogStream }),
    errorHandler(),
    koaBody(),
    cors(),
    respond()
  ];
  const v1PublicRouter = v1Router.createPublicRouter({ prefix: '/v1' });
  const v1PrivateRouter = v1Router.createPrivateRouter({ prefix: '/v1' });
  app.use(
    compose([
      ...middlewares,
      v1PublicRouter.routes(),
      v1PublicRouter.allowedMethods(),
      jwt({ secret }),
      v1PrivateRouter.routes(),
      v1PrivateRouter.allowedMethods(),
    ])
  );
  return app;
};

export const startApp = async (app: Koa, listen: boolean = true) => {
  const config = generateDbConfig(envVars);
  try {
    await createConnection(config);
    if (listen) {
      const appPort = envVars.API_PORT;
      app.listen(appPort, () => logger.info(`Listening on port: ${appPort}`));
    }
    return app;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
