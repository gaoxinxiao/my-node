/**
 * nodejs 是单线程的 异步非阻塞io模式
 * 
*/

(async () => {
    const fs = require('fs')
    const { promisify } = require('util')
    //将readFile变成同步使用 promise格式去获取
    const readFile = promisify(fs.readFile)

    //使用await获取 和 readFileSync同步获取的区别 await 是另外开启一个线程 readFileSync是在当前线程等待
    const data = await readFile('./con.js')

    //异步读取文件  将文件读取到内存中 创建一个buffer存储
    // fs.readFile('./con.js', (err, data) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(data.toString())
    // })

    //同步读取文件
    // const data = fs.readFileSync('./con.js')

    console.log(data.toString())
    console.log('...read')


})()