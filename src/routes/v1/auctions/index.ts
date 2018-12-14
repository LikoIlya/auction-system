// import * as joi from 'joi';
import * as Router from 'koa-router';

// import { validate } from '../../../middleware/validator';

import {
  auctionCreate,
  auctionCreateBid,
  auctionDeleteById,
  auctionFindById,
  auctionGetAll,
  auctionPatchById,
} from '../../../controllers/auctions';

export const attachAuctionsRoutes = (router: Router) => {
  router.get(
    '/',
    // validate({
    //   query: joi.object({
    //     name: joi.string().required(),
    //     description: joi.string().required(),
    //     location: joi.string().required(),
    //     endTime: joi.string().required(),
    //   }),
    //   headers: joi.object({
    //     name: joi
    //       .string()
    //       .email()
    //       .required(),
    //     description: joi.string().required(),
    //     location: joi.string().required(),
    //     endTime: joi.string().required(),
    //   }),
    // }),
    auctionGetAll
  );
  router.post('/', auctionCreate);
  router.get('/:id', auctionFindById);
  router.patch('/:id', auctionPatchById);
  router.delete('/:id', auctionDeleteById);

  router.post('/:id/bid', auctionCreateBid);

  return router;
};

export const createAuctionsRouter = (options: Router.IRouterOptions = {}) =>
  attachAuctionsRoutes(new Router(options));
