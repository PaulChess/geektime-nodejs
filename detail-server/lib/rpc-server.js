const net = require('net')

module.exports = class RPC {
  constructor({ decodeRequest, encodeResponse, isCompleteRequest }) {
    this.decodeRequest = decodeRequest
    this.encodeResponse = encodeResponse
    this.isCompleteRequest = isCompleteRequest
  }

  createServer(callback) {
    net.createServer(socket => {
      // 之前学的一些逻辑把它写进来
    })
  }
}