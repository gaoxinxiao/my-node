(async () => {
    const { MongoClient } = require('mongodb')
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url, { user: 'admin', password: '123456' });
    //创建连接
    let ret = await client.connect()
    const db = client.db('test')
    const fruits = db.collection('fruits')
    // 添加文档
    ret = await fruits.insertOne({
        name: '风清扬',
        price: 100
    })
    ret = await fruits.findOne()
    // 更新文档
    // 更新的操作符 $set
    await fruits.updateOne({ name: '风清扬' },
        { $set: { name: '东方不败' } })
    ret = await fruits.deleteOne({name: '东方不败'})
    console.log('更新文档', JSON.stringify(ret))
    client.close()
})()