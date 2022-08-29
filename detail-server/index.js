const fs = require('fs')
const { join } = require('path')
const protobuf = require('protocol-buffers')

/**
 * protobuf 有一些特殊的修饰符是需要记住的 required repeated optoions
 * https://colobu.com/2015/01/07/Protobuf-language-guide/
 */
const schemas = protobuf(fs.readFileSync(join(__dirname, 'detail.proto')))



/**
 * 引用封装好的 RPC 库
 * @param 请求体的 message 格式对象
 * @param 响应体的 message 格式对象
 */
const server = require('./lib/geeknode-rpc-server')(schemas.ColumnRequest, schemas.ColumnResponse)


// server.create()
// server.listen(4000)