const ffmpegHander = require('../../ffmpeghandler');

class Controller {
    async startStreamPush(ctx, next) {
        // 获取请求提交的数据
        let pullStreamUrl = ctx.request.body.pull_stream_url || '',
            pushStreamUrl = ctx.request.body.push_stream_url || '';
        console.log('接收到新的拉流直播请求');
        console.log('拉流地址', pullStreamUrl);
        console.log('推流地址', pushStreamUrl);
        console.log('try to pull stream and push');
        let result = await ffmpegHander.startStreamPush(pullStreamUrl, pushStreamUrl);
        ctx.body = {
            result: result
        }
    }

    async stopStreamPush(ctx, next) {
        let pullStreamUrl = ctx.request.body.pull_stream_url || '',
            pushStreamUrl = ctx.request.body.push_stream_url || '';
        console.log('接收到停止拉流直播请求');
        console.log('try to stop pull and push');
        let result = await ffmpegHander.stopStreamPush(pullStreamUrl, pushStreamUrl);
        ctx.body = {
            result: result
        }
    }
}

module.exports = new Controller();