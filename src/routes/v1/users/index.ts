import * as Router from 'koa-router';
import {
  usersDeleteById,
  usersFindById,
  usersGetAll,
  usersPatchById,
} from '../../../controllers/users';

export const attachUsersRoutes = (router: Router) => {
  router.get('/', usersGetAll);
  router.get('/:id', usersFindById);
  router.patch('/:id', usersPatchById);
  router.delete('/:id', usersDeleteById);
  return router;
};

export const createUsersRouter = (options: Router.IRouterOptions = {}) =>
  attachUsersRoutes(new Router(options));
