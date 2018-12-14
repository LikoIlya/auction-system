import * as Koa from 'koa';
export const errorHandler = () => async (ctx: Koa.Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
