import { Bid } from '../entity/Bid';

import { create, deleteById, getAll, patchById, readById } from './core';

export const bidsGetAll = getAll(Bid, { relations: ['createdBy'] });
export const bidsCreate = create(Bid);
export const bidsFindById = readById(Bid, { relations: ['createdBy'] });
export const bidsPatchById = patchById(Bid);
export const bidsDeleteById = deleteById(Bid);
