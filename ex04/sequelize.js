//使用操作对象的方式来操作数据库避免使用sql语句

(async () => {
    const Sequelize = require('sequelize')
    //连接数据库
    const sequelize = new Sequelize('ironman', 'root', '123456', {
        host: 'localhost',
        dialect: 'mysql',
        operatorAliases: false
    })
    //定义模型
    const Fruit = sequelize.define('Fruit', {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false }
    })

    //同步数据
    let ret = await Fruit.sync();


    const Koa = require('koa')
    const app = new Koa()
    const router = require('koa-router')()

    router.get('/list', async (ctx) => {
        ctx.set('Access-Control-Allow-Origin', '*')
        //查询全部数据
        let data = await Fruit.findAll()
        ctx.body = {
            code: 200,
            status: 'success',
            data: data
        }
    })

    router.get('/add', async (ctx) => {
        const { name } = ctx.query
        ctx.set('Access-Control-Allow-Origin', '*')
        //创建数据
        await Fruit.create({
            name: name,
            price: 3.5
        });
        ctx.body = { code: 200, status: 'success' }
    })

    router.get('/del', async (ctx) => {
        const { id } = ctx.query
        ctx.set('Access-Control-Allow-Origin', '*')
        //删除数据
        await Fruit.destroy({ where: { id } });
        ctx.body = { code: 200, status: 'success' }
    })



    app.use(router.routes())

    app.listen(3000, () => {
        console.log('start listen 3000')
    })

})()