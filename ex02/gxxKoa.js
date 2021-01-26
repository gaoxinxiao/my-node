const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')


class GxxKoa {
    constructor() {
        this.middlewares = []
    }
    use(callback) {
        this.middlewares.push(callback)
    }
    listen(...agrs) {
        const server = http.createServer(async (req, res) => {
            const ctx = this.createContext(req, res)
            let fn = this.compose(this.middlewares)
            await fn(ctx)
            res.end(ctx.body);
        })
        server.listen(...agrs)
    }

    compose(middlewares) {
        return function (ctx) {
            return dispatch(0)
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    //找不到函数直接返回一个空 的 微任务
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }

    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
}

module.exports = GxxKoa