
const Koa = require('koa')
const { initRouter, initController, initService,loadConfig } = require('./gxx-loader')

class Gxx {
    constructor(con) {
        this.$app = new Koa(con)
        loadConfig(this)
        this.$service = initService(this)
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }

    start(port) {
        this.$app.listen(port, () => console.log('服务启动中。。。。'))
    }
}

module.exports = Gxx