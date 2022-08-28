/**
 * 检查一段 buffer 是不是一个完整的数据包
 * 逻辑：判断 header 的 bodyLength，看看这段 buffer 是不是长于 header 和 body 的总长
 * 如果是，则返回这个包长，意味着这个请求包是完整的 ps: 一个完整数据包的长度是 10 100个请求, buffer 总长是 1000
 * 如果不是，则返回0，意味着包还没接受完
 * @param {*} buffer 
 */
 function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0
  }
  const bodyLength = buffer.readInt32BE(2)
  return (6 + bodyLength)
}

module.exports = {
  checkComplete
}