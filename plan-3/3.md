## Plan-2 中间件的实现
  - 成功封装了http server，并构造了context, request, response对象。但最重要的一条主线却还没有实现，那就是koa的中间件机制。
  - koa middleware是一个队列，我们也实现一个
  
这里先描述下原理，这里有3个aysnc函数
  
  
```
async function f1(next) {
    console.log('f1');
    await next();
}

async function f2(next) {
    console.log('f2');
    await next();
}

async function f3() {
    console.log('f3');
}
```

我们希望能够构造出一个函数，实现的效果是让三个函数依次执行。首先考虑想让f2执行完毕后，await next()去执行f3函数，那么显然，需要构造一个next函数，作用是调用f3，然后作为参数传给f2，既f2(f3)


```
let next1 = async function () {
    await f3();
}
m2(next1)
// 输出：m2 m3

```

进一步，考虑从m1开始执行，那么，m1的next参数需要是一个执行m2的函数，并且给m2传入的参数是m3
  

```
 let next1 = async function () {
    await f3();
}

let next2 = async function () {
    await f2(next1);
}
m1(next2)
//输出：m1 m2 m3

```
抽象下函数：

```
function createNext(middleware, oldNext) {
    return async function () {
        await middleware(oldNext);
    }
}

let next1 = createNext(m3, null);
let next2 = createNext(m2, next1);
let next3 = createNext(m1, next2);
next3()

//输出m1, m2, m3
```

在改造下，把3个函数存在队列数组

```
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

// 输出m1, m2, m3
```

 



