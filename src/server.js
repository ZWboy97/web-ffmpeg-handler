const Koa = require('koa');
const router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const apirouter = require('./api/route/index');
const cors = require('./middleware/cors');

const app = new Koa();

app.use(cors);
app.use(bodyParser());
app.use(apirouter.routes());

app.listen(3000)
console.log('[web-ffmpeg-handler] is start at port 3000')