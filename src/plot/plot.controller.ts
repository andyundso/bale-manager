import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getRepository, Repository } from 'typeorm';
import plotEntity from './plot.entity';
import * as HttpStatus from 'http-status-codes';

const routerOpts: Router.IRouterOptions = {
  prefix: '/plots',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  const plotRepo: Repository<plotEntity> = getPlotRepository();
  const plots = await plotRepo.find();

  ctx.body = {
    data: [...plots],
  };
});

router.get('/:plot_id', async (ctx: Koa.Context) => {
  const plotRepo: Repository<plotEntity> = getPlotRepository();
  const plot: plotEntity | undefined = await plotRepo.findOne(ctx.params.plot_id);

  if (!plot) {
    ctx.throw(HttpStatus.NOT_FOUND);
  } else {
    ctx.body = {
      data: { ...plot },
    };
  }
});

router.post('/', async (ctx:Koa.Context) => {
  const plotRepo: Repository<plotEntity> = getPlotRepository();
  console.log(ctx.request);

  const plot: plotEntity[] = plotRepo.create(ctx.request.body);
  await plotRepo.save(plot);

  ctx.body = {
    data: { ...plot },
  };
});

router.delete('/:plot_id', async (ctx:Koa.Context) => {
  const plotRepo: Repository<plotEntity> = getPlotRepository();
  const plot: plotEntity | undefined = await plotRepo.findOne(ctx.params.plot_id);

  if (plot) {
    await plotRepo.delete(plot);
    ctx.status = HttpStatus.NO_CONTENT;
  } else {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

});

router.patch('/:plot_id', async (ctx:Koa.Context) => {
  const plotRepo: Repository<plotEntity> = getPlotRepository();
  const plot: plotEntity | undefined = await plotRepo.findOne(ctx.params.plot_id);

  if (plot) {
    const updatedPlot = await plotRepo.merge(plot, ctx.request.body);
    await plotRepo.save(updatedPlot);

    ctx.body = {
      data: { ...updatedPlot },
    };
  } else {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
});

function getPlotRepository(): Repository<plotEntity> {
  return getRepository<plotEntity>(plotEntity);
}

export default router;
