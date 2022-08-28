const { lessonidList } = require('./constant')

const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000
})

// 请求序列号
let seq = 1;

/**
 * 创建 buffer，写入 id
 */
// id 长度过长需要用 32 位
function sendLessonid(socket) {
  const buffer = Buffer.alloc(6)
  // buffer 前两位写入序列号
  buffer.writeInt16BE(seq++);
  // buffer 后四位写入课程id
  const lessonId = lessonidList[Math.floor(Math.random() * lessonidList.length)]
  buffer.writeInt32BE(lessonId, 2)
  socket.write(buffer);
}

sendLessonid(socket)
/**
 * 监听获取服务端返回的数据
 */
socket.on('data', buffer => {
  const seqBuffer = buffer.slice(0, 2)
  const titleBuffer = buffer.slice(2)

  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());

  sendLessonid(socket)
})