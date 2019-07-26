let simpleKoa = require('./app');
let app = new simpleKoa();

// app.use(async ctx => {
//     ctx.body = 'hello ' + ctx.query.name;
// });

// app.listen(3000, () => {
//     console.log('listening on 3000');
// });


app.context.echoData = function (code = 200, data = null, msg = '') {
    this.res.setHeader('Content-Type', 'application/json;charset=utf-8');
    this.body = {
        code: code,
        data: data,
        message: msg
    };
};

app.use(async ctx => {
    let data = {
        name: ctx.query.name,
        age: 16,
        sex: 'male'
    }
    // 这里使用扩展，方便的返回utf-8格式编码，带有errno和errmsg的消息体
    ctx.echoData(0, data, 'success');
});

app.listen(3000, () => {
    console.log('listenning on 3000');
});