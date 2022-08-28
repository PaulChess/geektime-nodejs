/**
 * es6 模板字符串实现模板渲染
 * 防 xss 注入
 * include 子模板
 */
const vm = require('vm')

const user = {
  name: 'paulchess'
}

const templateA = '`<h2>${include("templateB")}</h2>`'
const templateB = '`<p>Hello PaulChess</p>`'

const templateMap = {
  templateA,
  templateB
}

const context = {
  include: function(name) {
    return templateMap[name]();
  },
  helper: function() {},
  _: function(markup) {
    if (!markup) {
      return ''
    }
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
  }
}

Object.keys(templateMap).forEach(key => {
  const temp = templateMap[key]

  templateMap[key] = vm.runInNewContext(`
    (function() {
      return ${temp}
    })
  `, context)
})

console.log(templateMap['templateA']())

// const result = vm.runInNewContext('`${_(`<script>Hello ${user.name}</script>`)}`', {
//   user,
//   _: function(markup) {
//     if (!markup) {
//       return ''
//     }
//     return String(markup)
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/'/g, '&#39;')
//       .replace(/"/g, '&quot;')
//   }
// })

// console.log(result);