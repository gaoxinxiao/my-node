const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {

    const { method, url } = req

    console.log('method', method)
    console.log('cookie', req.headers.cookie)
    if (method === 'GET' && url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) throw err
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (method === 'OPTIONS' && url === '/api/users') {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "G-Token,Content-Type",
            "Access-Control-Allow-Methods": "PUT",
            'Access-Control-Allow-Credentials': 'true'
        });
        res.end()
    } else if (method === 'GET' && url === '/api/users') {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.end(JSON.stringify({
            name: 'jerry'
        }))
    } else if (method === 'POST' && url === '/api/users') {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Set-Cookie', 'cookie1=va222;')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.end(JSON.stringify({
            name: 'jerry'
        }))
    } else if (method === 'POST' && url === '/api/save') {
        let reqData = []
        let size = 0
        req.on('data', data => {
            //开始读流
            console.log('>>>req on', data)
            reqData.push(data)
            size += data.length
        })
        req.on('end', function () {
            //读流完成
            console.log('end')
            const data = Buffer.concat(reqData, size)
            console.log('data', size, data.toString())
            res.end(`formdata:${data.toString()}`)
        })
    }

}).listen(4000, () => console.log('api http://localhost:4000'))