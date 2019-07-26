let simpleKoa = require('./app');
let app = new simpleKoa();

let responseData = {};

app.use(async (ctx, next) => {
    responseData.name = ctx.query.name || 'nike'
    await next()
    console.log('1')
    // ctx.body = responseData
});

app.use(async (ctx, next) => {
    responseData.age = 16;
    await next();
    console.log('2')
});

app.use(async ctx => {
    responseData.sex = 'male';
    ctx.body = responseData
    console.log('3')
});

app.listen(4001, () => {
    console.log('listening on 4001');
});