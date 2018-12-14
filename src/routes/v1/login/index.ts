import * as Router from 'koa-router';

import { findByEmail } from '../../../controllers/login';

export const attachLoginRoutes = (router: Router) => {
  router.post('/', findByEmail);
  return router;
};

export const createLoginRouter = (options: Router.IRouterOptions = {}) =>
  attachLoginRoutes(new Router(options));
