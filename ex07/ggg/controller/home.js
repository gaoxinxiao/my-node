module.exports = app => ({
    index: async ctx => {
        const name = await app.$service.user.getName()
        app.ctx.body = name// await app.$model.user.findAll()
    },
    detail: async ctx => {
        app.ctx.body = '详细页面ctrl'
    }
})