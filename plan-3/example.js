let simpleKoa = require('./app');
let app = new simpleKoa();

let responseData = {};

app.use(async (ctx, next) => {
    responseData.name = ctx.query.name || 'nike'
    await next()
    // ctx.body = responseData
});

app.use(async (ctx, next) => {
    responseData.age = 16;
    await next();
});

app.use(async ctx => {
    responseData.sex = 'male';
    ctx.body = responseData
});

app.listen(3000, () => {
    console.log('listening on 3000');
});