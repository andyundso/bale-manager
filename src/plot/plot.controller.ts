import * as Koa from 'koa';
import * as Router from 'koa-router';

const routerOpts: Router.IRouterOptions = {
  prefix: '/plots',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = 'GET ALL';
});

router.get('/:plot_id', async (ctx: Koa.Context) => {
  ctx.body = 'GET ALL';
});

router.post('/', async (ctx:Koa.Context) => {
  ctx.body = 'POST';
});

router.delete('/:plot_id', async (ctx:Koa.Context) => {
  ctx.body = 'DELETE';
});

router.patch('/:plot_id', async (ctx:Koa.Context) => {
  ctx.body = 'PATCH';
});

export default router;
