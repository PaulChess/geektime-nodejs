const { graphql, buildSchema } = require('graphql')

/**
 * 形式上非常类似于 protobuf
 */
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => {
    return 'hello world'
  }
}

module.exports = function(source) {
  return graphql({
    schema,
    source,
    rootValue
  }).then(res => {
    return res
    // console.log(res)
    // console.log(res.data.hello)
  })
}