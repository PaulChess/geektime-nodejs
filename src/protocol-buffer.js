/**
 * protocol-buffers 库 research
 * docs: https://github.com/mafintosh/protocol-buffers
 */
const protobuf = require('protocol-buffers')
const fs = require('fs')
const { join } = require('path')

const messages = protobuf(fs.readFileSync(join(__dirname, '../proto', 'test.proto'), 'utf-8'))

// 编码
const buf = messages.Column.encode({
  id: 3,
  name: 'node.js实战课程',
  price: 36.89
})
console.log(buf)


// 解码
const resetObj = messages.Column.decode(buf)
console.log(resetObj) // should print an object similar to above
