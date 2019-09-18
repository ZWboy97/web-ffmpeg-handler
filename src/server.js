const Koa = require('koa');
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const apirouter = require('./api/route/index');

const app = new Koa();

app.use(bodyParser());
app.use(apirouter.routes());

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')