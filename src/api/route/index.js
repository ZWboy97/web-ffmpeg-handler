const KoaRouter = require('koa-router');
const controller = require('../controllers/controller');

const router = new KoaRouter();

router.post('/api/ffmpeg/stream-push-start', controller.startStreamPush);

module.exports = router;