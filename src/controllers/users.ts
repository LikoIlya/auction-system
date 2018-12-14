import { Context } from 'koa';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

import { deleteById, getAll, patchById, readById } from './core';

export const usersGetAll = getAll(User);
export const usersCreate = async (context: Context) => {

    // get an entity repository to perform operations with entity
    const entityRepository = getManager().getRepository(User);

    const mergedEntity = {
        createdBy: 0,
        updatedBy: 0,
        ...context.request.body,
    };

    // create a real entity object from entity json object sent over http
    const createdEntity = entityRepository.create(mergedEntity);

    // save received entity
    await entityRepository.save(createdEntity);

    // return saved entity back
    context.status = 201;
    context.body = createdEntity;
};
export const usersFindById = readById(User);
export const usersPatchById = patchById(User);
export const usersDeleteById = deleteById(User);
