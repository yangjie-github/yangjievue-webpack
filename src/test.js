// node中导入模块: var 名称 = require('模块的标识符')
// node中向外暴露成员的方式module.exports = {} 和exports


// 在es6中也使用规范的形式来规定导入导出模块： import 模块名 from '模块的标识符'  或者  import '标识路径'
// 在es6中向外暴露成员： export default  和 export ;


// 注意导入导出要成套使用


// export default向外暴露的成员可以使用任意的var 变量 来接收；
export default {
    name: 'zhangsan',
    age: 20
}

// var info = {
//     address: 'zhangsan',
//     age: 20
// }
// export default info //这个也可以使用任意的var 变量 来接收；
// 注意：在一个模块中只能使用export default暴露一次，在一个模块中可以同时使用export default 和 export 向外暴露成员

//es6暴露, 可以暴露多个成员, 可以按需接收， 必须按照名称来接收
export var title = "xiaoxingxing"
export var content = "content"

