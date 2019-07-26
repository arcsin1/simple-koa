
async function m1(next) {
    console.log('m1');
    await next();
}

async function m2(next) {
    console.log('m2');
    await next();
}

async function m3() {
    console.log('m3');
}

function createNext(middleware, oldNext) {
    return async function () {
        await middleware(oldNext);
    }
}

let middlewares = [m1, m2, m3];
let len = middlewares.length;

// 最后一个中间件的next设置为一个立即resolve的promise函数
let next = async function () {
    return Promise.resolve();
}
for (let i = len - 1; i >= 0; i--) {
    next = createNext(middlewares[i], next);
}

next();