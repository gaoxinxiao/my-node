const http = require('http')

function updateTime() {
    setInterval(() => this.time = new Date().toUTCString(), 1000)
    return this.time
}

http.createServer((req, res) => {
    const { url } = req

    if (url === '/') {
        res.end(`
            <html>
                <!-- <meta http-equiv="Refresh" content="5" /> -->
                Html Update Time: ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    } else if (url === '/main.js') {
        const content = `document.writeln('<br>JS   Update Time:${updateTime()}')`
        res.statusCode = 200

        //强制缓存
        // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
        // res.setHeader('Cache-Control', 'max-age=20')
        // res.setHeader('Cache-Control', 'no-cache')

        //协商缓存
        // res.setHeader('last-modified', new Date().toUTCString())
        // if (new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()) {
        //     console.log('协商缓存命中....')
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }

        //协商缓存
        res.setHeader('Cache-Control', 'no-cache')
        const crypto = require('crypto');
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if (req.headers['if-none-match'] === hash) {
            console.log('Etag协商缓存命中.....')
            res.statusCode = 304
            res.end()
            return
        }
        res.end(content)
    } else if (url === '/favicon.ico') {
        console.log('favicon..')
        res.end('')
    }
}).listen(9000, () => console.log('监听中 http://localhost:9000'))