// class  App{
//     constructor() {
//      this.res = {
//          body: '',
//          status: '',

//      }
//      this.req = {
//          query: ''
//      }
//    }
//     delegateGet(property, name) {
//         Object.defineProperty(this, name, { 
//             get: function () {  return this[property][name] } 
//         });
//     }
//     delegateSet(property, name) {
//         Object.defineProperty(this, name, { 
//             set: function (x) {  this[property][name] = x } 
//         });
//     }
// }


// let o = { }
// let res = {}

// function delegateSet(property, name) {
//     Object.defineProperty(o, name, { 
//         set: function (x) {  property[name] = x / 2; } 
//     });
// }

// let responseSet = ['body', 'status'];
// responseSet.forEach(ele => {
//     delegateSet(res, ele);
// });

// o.body = 4



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

// let next1 = createNext(m3, null);
// let next2 = createNext(m2, next1);
// let next3 = createNext(m1, next2);

// next3();
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