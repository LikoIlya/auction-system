import * as Router from 'koa-router';
import {
    usersCreate
} from '../../../controllers/users';

export const attachRegisterRoutes = (router: Router) => {
    router.post('/', usersCreate);
    return router;
};

export const createRegisterRouter = (options: Router.IRouterOptions = {}) =>
    attachRegisterRoutes(new Router(options));
