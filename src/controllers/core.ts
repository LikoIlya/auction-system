import { Context } from 'koa';
import { FindManyOptions, FindOneOptions, getManager } from 'typeorm';

// Ideally shouldn't use any here

export const getAll = (Entity: any, options: FindManyOptions = {}) => async (
  context: Context
) => {
  // get an entity repository to perform operations with entity
  const entityRepository = getManager().getRepository(Entity);

  // load all entities
  const entitities = await entityRepository.find(options);

  // return loaded entities
  context.body = entitities;
};

export const create = (Entity: any) => async (context: Context) => {
  const {
    user: { id },
  } = context.state;
  // get an entity repository to perform operations with entity
  const entityRepository = getManager().getRepository(Entity);

  const mergedEntity = {
    createdBy: id,
    updatedBy: id,
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

export const readById = (Entity: any, options: FindOneOptions = {}) => async (
  context: Context
) => {
  // get an entity repository to perform operations with entity
  const entityRepository = getManager().getRepository(Entity);

  // load an entity by a given entity id
  const entity = await entityRepository.findOne(context.params.id, options);

  // if entity was not found return 404 to the client
  if (!entity) {
    context.status = 404;
    return;
  }
  // return loaded entity
  context.body = entity;
};

export const patchById = (Entity: any) => async (context: Context) => {
  const {
    user: { id },
  } = context.state;
  // get an entity repository to perform operations with entity
  const entityRepository = getManager().getRepository(Entity);

  const mergedEntity = {
    updatedBy: id,
    ...context.request.body,
  };

  await entityRepository.update(context.params.id, mergedEntity);

  context.status = 204;
};

export const deleteById = (Entity: any) => async (context: Context) => {
  // get an entity repository to perform operations with entity
  const entityRepository = getManager().getRepository(Entity);

  // load an entity by a given entity id
  const entity = await entityRepository.findOne(context.params.id);

  // if entity was not found return 404 to the client
  if (!entity) {
    context.status = 404;
    return;
  }

  entityRepository.delete(context.params.id);

  // return loaded entity
  context.status = 204;
};
