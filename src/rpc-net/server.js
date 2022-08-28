const { lessonMap } = require('./constant')

const net = require('net')

const server = net.createServer(socket => {
  socket.on('data', function(buffer) {
    const seqBuffer = buffer.slice(0 ,2)
    const lessonid = buffer.readInt32BE(2)
    
    setTimeout(() => {
      const buffer = Buffer.concat([seqBuffer, Buffer.from(lessonMap[lessonid])])
      socket.write(buffer)
    }, 500)
  })
})

server.listen(4000, () => {
  console.log('服务端已经启动在4000端口')
})