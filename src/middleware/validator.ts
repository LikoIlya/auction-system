import * as joi from 'joi';
import { Context } from 'koa';

const validateObject = (
  object: object = {},
  label: string,
  schema: joi.SchemaLike,
  options?: joi.ValidationOptions
) => {
  if (schema) {
    const { error } = joi.validate(object, schema, options);
    if (error) {
      throw new Error(`Invalid ${label} - ${error.message}`);
    }
  }
};

export const validate = (validationObj: {
  headers?: any;
  params?: any;
  query?: any;
  body?: any;
}) => async (ctx: Context, next: () => Promise<any>) => {
  try {
    const errors: Error[] = [];
    if (validationObj.headers) {
      try {
        validateObject(ctx.headers, 'Headers', validationObj.headers, {
          allowUnknown: true,
          abortEarly: false,
        });
      } catch (e) {
        errors.push(e);
      }
    }
    if (validationObj.params) {
      try {
        validateObject(ctx.params, 'URL Parameters', validationObj.params, {
          abortEarly: false,
        });
      } catch (e) {
        errors.push(e);
      }
    }
    if (validationObj.query) {
      try {
        validateObject(ctx.query, 'URL Query', validationObj.query, {
          abortEarly: false,
        });
      } catch (e) {
        errors.push(e);
      }
    }
    if (ctx.request.body) {
      try {
        validateObject(ctx.request.body, 'Request Body', validationObj.body, {
          abortEarly: false,
        });
      } catch (e) {
        errors.push(e);
      }
    }
    if (errors.length > 0) {
      const message = errors.map((e: Error) => e.message).join('\n');
      throw new Error(message);
    }

    await next();
  } catch (err) {
    ctx.throw(400, err.message);
  }
};
