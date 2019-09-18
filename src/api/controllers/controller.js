const ffmpegHander = require('../../ffmpeghandler');

class Controller {
    async pull(ctx, next) {
        // 获取请求提交的数据
        let name = ctx.request.body.name || '',
            pwd = ctx.request.body.pwd || '';
        console.log(ctx.request.body, pwd);

        console.log('try to pull');
        ffmpegHander.startPull();
        console.log('success pull')


        // do something
        ctx.body = {
            status: true,
            token: '123'
        }
    }
}

module.exports = new Controller();