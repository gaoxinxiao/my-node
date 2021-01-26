const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

const GxxKoa = require('./gxxKoa')

const appGxxKoa = new GxxKoa()

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));


appGxxKoa.use(async (ctx, next) => {
    ctx.body = '1'
    await next()
    ctx.body += '5'
})

appGxxKoa.use(async (ctx, next) => {
    ctx.body += "2";
    await delay();
    await next();
    ctx.body += "4";
})

appGxxKoa.use(async (ctx, next) => {
    ctx.body += '3'
})


// app.use(async (ctx, next) => {
//     let start = Date.now()
//     ctx.body = 'hello'
//     console.log(1)
//     await next()
//     console.log(3)
//     let end = Date.now()
//     console.log('-=-=-=-=-', end - start)
// })

// app.use(async (ctx, next) => {
//     let expire = Date.now() + 100
//     while (Date.now() < expire);
//     console.log(2)
//     ctx.body = 'world'
//     next()
// })

//中间件应用能力还没有实现
// router.get('/usr', async (ctx, next) => {
//     ctx.body = 'userlost'
// })

// app.use(router.routes())

appGxxKoa.listen(8080, () => console.log('listen 8080'))