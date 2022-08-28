const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')
const { join } = require('path')

const app = new koa()

app.use(
  static(join(__dirname, 'source'))
)

app.use(
  mount('/', async ctx => {
    ctx.body = fs.readFileSync(join(__dirname, 'source', 'index.htm'), 'utf-8')
  })
)

app.listen('3000')