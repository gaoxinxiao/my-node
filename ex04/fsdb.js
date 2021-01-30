const fs = require('fs')
const readLine = require('readline') //读取终端命令行

//get a
function get(key) {
    fs.readFile('./db.json', (err, data) => {
        if (err) throw err
        let json = JSON.parse(data)
        console.log(json[key])
    })
}

//set a 1
function set(key, val) {
    fs.readFile('./db.json', (err, data) => {
        let json = data ? JSON.parse(data) : {}
        json[key] = val
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if (err) {
                console.log(err)
            } else {
                console.log('写入成功')
            }
        })
    })
}

const rl = readLine.createInterface({
    input: process.stdin, //获取命令行的输入
    output: process.stdout
})

rl.on('line', function (input) {
    const [opt, key, val] = input.split(' ')
    if (opt === 'set') {
        set(key, val)
    } else if (opt === 'get') {
        get(key)
    } else if (opt === 'exit') {
        rl.close()
    } else {
        console.log('输入错了')
    }
})

rl.on('close', function (input) {
    console.log('结束')
    process.exit(0)
})  