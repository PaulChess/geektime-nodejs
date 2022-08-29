const RPC = require('./rpc-server');

module.exports = function(protobufRequestSchema, protobufResponseSchema) {
  // 返回的就是一个 rpc 服务
  return new RPC({
    decodeRequest() {},
    encodeResponse() {},
    isCompleteRequest() {}
  })
}