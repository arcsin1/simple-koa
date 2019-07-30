## Plan-2
- 在koa里面最重要的是context
- 那我们构造request, response, context对象

如果阅读koa文档，会发现koa有三个重要的对象，分别是request, response, context。
其中request是对node原生的request的封装，
response是对node原生response对象的封装，
context对象则是回调函数上下文对象，挂载了koa request和response对象。

1. koa的request和response对象，只是提供了对node原生request和response对象的一些方法的封装
2. context对象，则挂载了request和response对象


