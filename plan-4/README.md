## plan-4 优化中间件部分
 - 改用尾递归处理

### 解读一下这段代码

```
 //compose函数需要传入一个数组队列 [fn,fn,fn,fn]
 compose(middlewares) {
    // compose函数调用后，返回的是以下这个匿名函数
    // 匿名函数接收两个参数，第一个随便传入，根据使用场景决定
    // 第一次调用时候第二个参数next实际上是一个undefined，因为初次调用并不需要传入next参数
   // 这个匿名函数返回一个promise
        return async (context,next) => {
            // 初始下标为-1
            let index = -1
            return dispatch(0)
            function dispatch (i) {
                // 如果传入i为负数且<=-1 返回一个Promise.reject携带着错误信息
                // 所以执行两次next会报出这个错误。将状态rejected，就是确保在一个中间件中next只调用一次
                if (i <= index) return Promise.reject(new Error('next()called multiple times'))
                index = i
                let fn = middlewares[i]
                // next在这个内部中是一个局部变量，值为undefined
               // 当i已经是数组的length了，说明中间件函数都执行结束，执行结束后把fn设置为undefined
                if (i === middlewares.length) fn = next
                //如果中间件遍历到最后了。那么。此时return Promise.resolve()返回一个成功状态的promise
                // 方面之后做调用then
                if (!fn) return Promise.resolve()
                try {
                    // 调用后依然返回一个成功的状态的Promise对象
                    // 用Promise包裹中间件，方便await调用
                    // 调用中间件函数，传入context（根据场景不同可以传入不同的值，在KOa传入的是ctx）
                    // 递归调用dispatch函数，目的是执行下一个中间件函数
                    // next函数在中间件函数调用后返回的是一个promise对象
                    // bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。
            
                    // return Promise.resolve(fn(context, function next () {return dispatch(i + 1)}))
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                   
                } catch (err) {
                    return Promise.reject(err)
                }
            }
        }
    }
```

