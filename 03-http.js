const http = require('http')
const fs = require('fs')


const server = http.createServer((request, response) => {

    const { url, method, headers } = request

    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type':
                        'text/plain;charset=utf-8'
                });
                response.end('500，服务器错误');
                return;
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200, {
            "Content-Type": "application/json"
        })
        response.end(JSON.stringify({
            name: "jerry"
        }))
    } else if (method === 'GET' && headers.accept.indexOf('images/*')) {
        console.log(headers, 'headers')
        //覆盖所有image请求
        // const data = fs.readFile('')
        // response.end(data)
        fs.createReadStream('.' + url).pipe(response)
    } else {

    }
})


server.listen(3000, () => console.log('listen'))

function getPrototypeChain(obj) {
    let arr = []

    while (obj = Object.getPrototypeOf(obj)) {
        arr.push(obj)
    }
    return arr
}