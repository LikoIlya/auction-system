import * as Router from 'koa-router';

import { createAuctionsRouter } from './auctions';
import { createLoginRouter } from './login';
import { createRegisterRouter } from './register';
import { createUsersRouter } from './users';

const attachChildRouter = (
  parentRouter: Router,
  path: string,
  childRouter: Router
) => {
  parentRouter.use(path, childRouter.routes(), childRouter.allowedMethods());
};

export const attachPrivateRoutes = (router: Router) => {
  attachChildRouter(router, '/users', createUsersRouter());
  attachChildRouter(router, '/auctions', createAuctionsRouter());
  return router;
};

export const createPrivateRouter = (options: Router.IRouterOptions = {}) =>
  attachPrivateRoutes(new Router(options));

export const attachPublicRoutes = (router: Router) => {
  attachChildRouter(router, '/register', createRegisterRouter());
  attachChildRouter(router, '/login', createLoginRouter());
  return router;
};

export const createPublicRouter = (options: Router.IRouterOptions = {}) =>
  attachPublicRoutes(new Router(options));
