/**
 * 重点解决全双工通信的两个问题
 * 1. 粘包问题
 * 2. 包完整性问题
 */

const net = require('net')
const { lessonMap } = require('../rpc-net/constant')
const { checkComplete } = require('./util')
const PORT = 4000

function decode(buffer) {
  const header = buffer.slice(0, 6)
  const seq = header.readInt16BE(0)

  const body = buffer.slice(6).readInt32BE()

  return {
    seq,
    data: body
  }
}

function encode(data, seq) {
  // 当数据长度不确定的时候就可以使用 Buffer.from
  // 如果相对比较确定，在可控范围内，可以使用 Buffer.alloc
  const body = Buffer.from(data)

  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length, 2)

  // 单个包buffer的长度就是 6 + body的长度
  const buffer = Buffer.concat([header, body])

  return buffer
}

const server = net.createServer(socket => {
  let oldBuffer = null

  socket.on('data', buffer => {
    // 把上一次data事件使用残余的 buffer 接上来
    if (oldBuffer) {
      buffer = Buffer.concat([oldBuffer, buffer])
    }

    // 单数据包长度
    let packageLength = 0;
    while (packageLength = checkComplete(buffer)) {
      // 获取一个数据包
      const package = buffer.slice(0, packageLength)
      // 截取掉上面得到的数据包后得到剩下的 buffer
      buffer = buffer.slice(packageLength)

      const result = decode(package)

      socket.write(
        encode(lessonMap[result.data], result.seq)
      )
    }

    // 把残余的 buffer 记下来
    oldBuffer = buffer
  })
})

server.listen(PORT, () => {
  console.log(`服务成功运行在 ${PORT} 端口.`);
})