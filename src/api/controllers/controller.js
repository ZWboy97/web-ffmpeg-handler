const ffmpegHander = require('../../ffmpeghandler');

class Controller {
    async startStreamPush(ctx, next) {
        // 获取请求提交的数据
        let pullStreamUrl = ctx.request.body.pull_stream_url || '',
            pushStreamUrl = ctx.request.body.push_stream_url || '';
        console.log(pullStreamUrl, pushStreamUrl);
        console.log('try to pull stream and push');
        let result = await ffmpegHander.startStreamPush(pullStreamUrl, pushStreamUrl);
        ctx.body = {
            status: true,
            token: result
        }
    }
}

module.exports = new Controller();