//在内存中开辟一段 长度为10个字节 的buffer
const buf1 = Buffer.alloc(10)

console.log(buf1, 'buf1')

const buf2 = Buffer.from('a')

console.log(buf2, 'buf2')

const buf3 = Buffer.from('高')

console.log(buf3, 'buf3')

const buf4 = Buffer.concat([buf2, buf3])

console.log(buf4, 'buf4')
