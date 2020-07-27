const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const connectionString = `mongodb://db/home-db`;
const db = require('@paralect/node-mongo').connect(connectionString);

const companySchema = require('./user.schema');

const bodyParser = require('koa-bodyparser');

const userService = db.createService('tp/users',companySchema);
const logService = db.createService('tp/logs');

app.use(bodyParser());

router.get('/GET/me', async (ctx, next) => {
    ctx.body = await userService.findOne();
    next()
  });

router.post('/POST/logs', async(ctx, next) => {
    ctx.body = await logService.create({
        event: ctx.request.body.event
      });
    next()
  });  

router.get('/GET/logs', (ctx, next) => {
    ctx.body = await logService.find();
    next()
  });  

  app.use(router.routes())
app.listen(8080);


