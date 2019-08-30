import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import * as HttpStatus from 'http-status-codes';
import Plot from './plot.entity';

const routerOpts: Router.IRouterOptions = {
  prefix: '/plots',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  const plots = await Plot.find();

  ctx.body = {
    data: [...plots],
  };
});

router.get('/:plot_id', async (ctx: Koa.Context) => {
  const plot: Plot | undefined = await Plot.findOne(ctx.params.plot_id);

  if (!plot) {
    ctx.throw(HttpStatus.NOT_FOUND);
  } else {
    ctx.body = {
      data: { ...plot },
    };
  }
});

router.post('/', async (ctx:Koa.Context) => {
  const plot: Plot = { ...ctx.request.body };
  await plot.save();

  ctx.body = {
    data: { ...plot },
  };
});

router.delete('/:plot_id', async (ctx:Koa.Context) => {
  const plot: Plot | undefined = await Plot.findOne(ctx.params.plot_id);

  if (plot) {
    await Plot.remove(plot);
    ctx.status = HttpStatus.NO_CONTENT;
  } else {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

});

router.patch('/:plot_id', async (ctx:Koa.Context) => {
  const plot: Plot | undefined = await Plot.findOne(ctx.params.plot_id);
  console.log(plot);

  if (plot) {
    const updatedPlot: Plot = Object.assign(plot, ctx.request.body);
    await updatedPlot.save();

    ctx.body = {
      data: { ...updatedPlot },
    };
  } else {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
});

export default router;
