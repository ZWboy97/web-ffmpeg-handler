var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg('http://39.106.194.43:8090/live/sq3oOJjN6s.flv')
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
    .output('rtmp://39.106.194.43:1935/live/i2yTkvYgLQ?auth_key=9487f14f4544ee2ae2d995ec4de2172d&vhost=default')
    .run();