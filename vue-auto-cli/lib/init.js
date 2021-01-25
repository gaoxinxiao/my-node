const { promisify } = require('util')
const figlet = promisify(require('figlet')) //获取设置终端logo方式
const clear = require('clear')
const chalk = require('chalk')

const log = content => console.log(chalk.blue(content))
const { clone } = require('./download')

module.exports = async name => {
    //显示欢迎界面
    clear()
    const data = await figlet('Welcome Stark')
    log(data)


    log(`🚀🚀🚀🚀🚀🚀🚀🚀创建项目 ${name}`)

    await clone('github:su37josephxia/vue-template', name)

    log(`cd ${name}`)
    log(`yarn install`)
    log(`npm run serve`)

}

