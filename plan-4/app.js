let http = require('http');
let context = require('./context');
let request = require('./req');
let response = require('./res');

class App {

    /**
     * 构造函数
     */
    constructor() {
        this.callbackFunc;
        this.middlewares = [];
        this.context = context;
        this.request = request;
        this.response = response;
    }

    /**
     * 开启http server并传入callback
     */
    listen(...args) {
        let server = http.createServer(this.callback());
        server.listen(...args);
    }

    /**
     * 挂载回调函数
     * @param {Function} fn 回调处理函数
     */
    use(middleware) {
        this.middlewares.push(middleware);
    }

    /**
     * 中间件合并方法，将中间件数组合并为一个中间件
     * @return {Function}
     */
    compose(middlewares) {
        // 将middlewares合并为一个函数，该函数接收一个ctx对象
        return async (context,next) => {
            let index = -1
            return dispatch(0)
            function dispatch (i) {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'))
                index = i
                let fn = middlewares[i]
                if (i === middlewares.length) fn = next
                if (!fn) return Promise.resolve()
                try {
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                } catch (err) {
                    return Promise.reject(err)
                }
            }
        }
    }

    /**
     * 获取http server所需的callback函数
     * @return {Function} fn
     */
    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            let respond = () => this.responseBody(ctx);
            let fn = this.compose(this.middlewares);
            // console.log(fn)
            return fn(ctx).then(respond);
        };
    }

    /**
     * 构造ctx
     * @param {Object} req node req实例
     * @param {Object} res node res实例
     * @return {Object} ctx实例
     */
    createContext(req, res) {
        // 针对每个请求，都要创建ctx对象
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    /**
     * 对客户端消息进行回复
     * @param {Object} ctx ctx实例
     */
    responseBody(ctx) {
        let content = ctx.body;
        if (typeof content === 'string') {
            ctx.res.end(content);
        }
        else if (typeof content === 'object') {
            ctx.res.end(JSON.stringify(content));
        }
    }

}

module.exports = App;