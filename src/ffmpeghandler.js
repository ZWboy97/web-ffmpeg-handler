const ffmpeg = require('fluent-ffmpeg');
const HashMap = require('hashmap');
let inProcessHashMap = new HashMap();

class FFmpegHandler {

    constructor() {
        console.log('新建 ffmpeg handler');
    }


    /**
     * 拉流直播Handler
     * @param {*} pullStreamUrl 
     * @param {*} pushStreamUrl 
     */
    async startStreamPush(pullStreamUrl, pushStreamUrl) {
        let hasProcess = inProcessHashMap.has(pushStreamUrl);
        if (hasProcess) {
            console.log('与已有推流冲突了')
            return 'conflict'
        }
        let result = await this.startStreamPushComand(pullStreamUrl, pushStreamUrl)
        return result;
    }

    /**
     * 异步执行拉流直播命令
     * @param {*} pullStreamUrl 
     * @param {*} pushStreamUrl 
     */
    startStreamPushComand(pullStreamUrl, pushStreamUrl) {
        inProcessHashMap.set(pushStreamUrl, ffmpeg(pullStreamUrl));
        return new Promise((resolve, reject) => {
            try {
                inProcessHashMap.get(pushStreamUrl)
                    .on('start', function (commandLine) {
                        console.log('启动文件推流，实际执行命令:' + commandLine);
                    })
                    .on('error', function (err, stdout, stderr) {
                        console.log('推流发生错误：', err.message);
                        inProcessHashMap.remove(pushStreamUrl);
                        resolve('error');
                    })
                    .on('progress', function (progress) {
                        console.log('推流中，进度:' + progress.percent + '% 已完成');
                        resolve('success');
                    })
                    .on('end', function () {
                        console.log('推流处理结束');
                        inProcessHashMap.remove(pushStreamUrl);
                    })
                    .inputOptions([
                    ])
                    .outputOptions([
                        "-c copy",
                        "-f flv"
                    ])
                    .output(pushStreamUrl)
                    .run();
            } catch (err) {
                reject(err);
            }
        })
    }

    async stopStreamPush(pullStreamUrl, pushStreamUrl) {
        let result = await this.stopStreamPushComand(pullStreamUrl, pushStreamUrl)
        return result;
    }

    stopStreamPushComand(pullStreamUrl, pushStreamUrl) {
        return new Promise((resolve, reject) => {
            try {
                let hasProcess = inProcessHashMap.has(pushStreamUrl);
                if (hasProcess) {
                    var command = inProcessHashMap.get(pushStreamUrl);
                    command.on('error', function (err, stdout, stderr) {
                        console.log('停止推流：', err.message);
                        inProcessHashMap.remove(pushStreamUrl);
                        resolve('success');
                    })
                        .renice(-10); //提高优先级
                    command.kill('SIGKILL');
                } else {
                    console.log('该流不存在')
                    resolve('noexist');
                }
            } catch (err) {
                reject(err);
            }
        })

    }


    startFilePush(fileUrlList, pushStreamUrl) {
        var command = ffmpeg(fileUrlList[0])
            .on('start', function (commandLine) {
                console.log('启动文件推流，实际执行命令:' + commandLine);
            })
            .on('error', function (err, stdout, stderr) {
                console.log('推流发生错误：', err.message);
            })
            .on('progress', function (progress) {
                console.log('推流中，进度:' + progress.percent + '% 已完成');
            })
            .on('end', function () {
                console.log('推流处理结束');
            })
            .inputOptions([
                "-re",  //推文件流的时候要加上
            ])
            .outputOptions([
                "-c copy",
                "-f flv"
            ]
            )
            .output(pushStreamUrl)
            .run();
    }
}

module.exports = new FFmpegHandler();