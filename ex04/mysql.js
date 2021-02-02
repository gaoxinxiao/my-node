(async () => {
    const mysql = require('mysql2/promise')
    const config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'ironman'
    }
    const connection = await mysql.createConnection(config)

    // 查询 conn.query()
    // 创建表
    // const CREATE_SQL = await connection.execute(`
    // CREATE TABLE IF NOT EXISTS test(
    //   id INT NOT NULL AUTO_INCREMENT,
    //   message VARCHAR(45) NULL,
    //   PRIMARY KEY (id)
    // )
    // `)

    // 插入数据
    // const ret = await connection.execute(`
    // INSERT INTO test (message) VALUE(?)
    // `, ['abc']);

    //查询
    const [rows, fields] = await connection.execute(`
    SELECT * FROM test
    `);

    console.log(JSON.stringify(rows), 'row123s123')
})()