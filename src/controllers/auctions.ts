import { Context } from 'koa';
import * as moment from 'moment';
import { getManager } from 'typeorm';

import { Auction } from '../entity/Auction';
import { Bid } from '../entity/Bid';
import { create, deleteById, getAll, patchById, readById } from './core';

export const auctionGetAll = getAll(Auction, {
  relations: ['bids', 'bids.updatedBy'],
});
export const auctionCreate = create(Auction);
export const auctionFindById = readById(Auction, {
  relations: ['bids', 'bids.updatedBy'],
});
export const auctionPatchById = patchById(Auction);
export const auctionDeleteById = deleteById(Auction);

export const auctionCreateBid = async (context: Context) => {
  const now = moment().utc();
  const auctionRepository = getManager().getRepository(Auction);
  const bidRepository = getManager().getRepository(Bid);

  // load an entity by a given entity id
  const auction = await auctionRepository.findOne(context.params.id);

  const auctionEnd = moment(auction.endTime);
  if (auctionEnd.diff(now) < 0) {
    context.body = { message: 'Auction has Ended' };
    return;
  }

  const proposedBid = Number(context.request.body.amount);

  if (isNaN(proposedBid)) {
    context.body = {
      message: `${proposedBid} is not a number.`,
    };
    return;
  }

  const topBid = await bidRepository.findOne({
    where: {
      auctionId: context.params.id,
    },
    order: {
      amount: 'DESC',
    },
  });

  if (topBid && proposedBid <= topBid.amount) {
    context.body = {
      message: `${proposedBid} is not greater than ${topBid.amount}`,
    };
    return;
  }
  // Update Bid

  const {
    user: { id },
  } = context.state;

  const newBid = {
    createdBy: id,
    updatedBy: id,
    amount: proposedBid,
    auctionId: context.params.id,
  };

  const createdBid = bidRepository.create(newBid);

  await bidRepository.save(createdBid);
  const res = await bidRepository.findOne(createdBid.id, {
    relations: ['updatedBy'],
  });
  context.status = 201;
  context.body = res;
};
