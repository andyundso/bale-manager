import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
import * as bodyParser from 'koa-bodyparser';
import plotController from '../plot/plot.controller';

const app: Koa = new Koa();

// Generic error handling middleware
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Initial route
app.use(bodyParser());
app.use(plotController.routes());
app.use(plotController.allowedMethods());
app.use(require('koa-static')('./build'));

// Application error logging
app.on('error', console.error);

export default app;
