const KoaRouter = require('koa-router');
const controller = require('../controllers/controller');

const router = new KoaRouter();

router.post('/api/ffmpeg/pull', controller.pull);

module.exports = router;