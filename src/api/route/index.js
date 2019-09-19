const KoaRouter = require('koa-router');
const controller = require('../controllers/controller');

const router = new KoaRouter();

router
    .post('/api/ffmpeg/stream-push-start', controller.startStreamPush)
    .post('/api/ffmpeg/stream-push-stop', controller.stopStreamPush)
    .post('/api/ffmpeg/stream-push-status', controller.getStreamPushStatus);

module.exports = router;