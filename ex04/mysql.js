const mysql = require('mysql')
const cfg = {
    host: 'localhost',
    user: 'root',
    passworld: '123456',
    database: 'testlist'
}
const conn = mysql.createConnection(cfg)

conn.connect(err =>{
    if (err) throw err
    console.log('连接成功')
})