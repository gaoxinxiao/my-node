// const Koa = require('koa')
// const app = new Koa()
// const { initRouter } = require('./gxx-loader')

// app.use(initRouter().routes())
// app.listen(3000,()=> console.log('服务启动中。。。。'))


const Gxx = require('./gxx')

const app = new Gxx()

app.start(3000)