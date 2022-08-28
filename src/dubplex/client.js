const net = require('net')
const { lessonidList } = require('../rpc-net/constant')
const { checkComplete } = require('./util')

// 全局维护包序号
let seq = 0;

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

/**
 * 二进制数据包编码函数
 * @param {*} data {id} 
 * @returns buffer
 */
function encode(data) {
  // 在业务中可以使用 protobuf 把业务数据转成 buffer
  // 在这个例子中直接用 node 自带的 Buffer 模块把课程 id 转成 buffer 进行发送
  const body = Buffer.alloc(4)
  body.writeInt32BE(lessonidList[data.id])

  // 正常来说，一个 rpc 调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包体的长度，从而实现全双工通信
  const header = Buffer.alloc(6)
  header.writeInt16BE(seq)
  header.writeInt32BE(body.length , 2)

  // 拼接 header 和 body 形成要发送给服务器的数据包
  // 一个二进制数据包的总长是10 header:6 body：4
  const buffer = Buffer.concat([header, body])

  console.log(`包${seq}传输的课程id为${lessonidList[data.id]}`)
  
  // 生成数据包信息以后就可以把全局维护的 seq 加 1
  seq++
  
  return buffer
}

function decode(buffer) {
  const header = buffer.slice(0, 6)
  const seq = header.readInt16BE(0)

  const body = buffer.slice(6)

  // 这里注意一下，Buffer.from 传过来的用 toString 转成字符串
  // 如果是通过 writeInt32BE 之类写的，可以用相应的 read 方法去读
  return {
    seq,
    data: body.toString()
  }
}

let oldBuffer = null

socket.on('data', buffer => {
  // 把上一次data事件使用残余的 buffer 接上来
  if (oldBuffer) {
    buffer = Buffer.concat([oldBuffer, buffer])
  }

  let completeLength = 0;
  while(completeLength = checkComplete(buffer)) {
    // 截取单个数据包
    const package = buffer.slice(0, completeLength)
    // 得到截取完之后剩下的 buffer
    buffer = buffer.slice(completeLength)

    const result = decode(package)

    console.log(`包${result.seq}, 返回值是 ${result.data}`)
  }

  // 把残余的 buffer 记下来
  oldBuffer = buffer
})

// 并行发包，一下子直接发100个包
for (let k = 0; k < 100; k++) {
  id = Math.floor(Math.random() * lessonidList.length);
  socket.write(encode({ id }))
}
