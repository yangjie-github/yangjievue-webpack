// 这是项目的js入口文件

//导入jquery, import是es6导入模块的方式；
//由于浏览器解析不了es6语法, 
//在项目的根目录执行命令：webpack .\src\main.js .\disk\bundle.js, 将不能识别的es6语法的main.js文件交给webpack来处理， 并放在disk文件夹下，名字为bundle.js

//werbpack：
//          可以处理js文件之间的互相依赖关系
//          可以处理浏览器的不兼容的问题
import $ from 'jquery'

//引入css, webpack只能处理js文件，其他的文件处理不了；如果需要处理非js的文件，需要安装第三方的loader加载器
//处理css, 
//       1.需要安装： npm i style-loader css-loader -D,
//       2.在package.config.js配置文件中，新增一个配置节点moudule， 它是一个对象，在这个对象身上有个rule属性的数组，里面存放了第三方的处理规则；
import './css/index.css'

//安装处理less的loader： npm i less-loader -D, 还需要装less: npm i less -D
import './css/index.less'

//安装处理scss的loader： npm i sass-loader -D, 还需要node-sass: cnpm i node-sass -D  一般要使用cnpm安装
import './css/index.scss'

// 引入bootstrp样式
import 'bootstrap/dist/css/bootstrap.css'

$(function() {
    $('li:odd').css('backgroundColor', 'yellow');
    $('li:even').css('backgroundColor', 'green');
})

// 之前创建对象, 用function来代替类
// function Animal(name) {
//     this.name = name;
// }
// Animal.info = 123;
// var a1 = new Animal("aaa");
// console.log(Animal.info)//这是访问实例属性
// console.log(a1.info) //这是访问实例属性


//webpack只能处理一部分es6语法， 这时候需要解除第三方的loader来处理， 将高级语法转为低级语法， 结果会打包到bundle.js中；
// 1.安装Babel, 需要安装两套包： 
//                          npm i babel-core babel-loader babel-plugin-transform-runtime -D // babel的转换工具
//                          npm i babel-preset-env babel-preset-stage-0 -D //babe高级和低级的对应关系
//                                                                         //babel-preset-env是比较新的语法(包含了所有的es***语法)， 之前的是babel-preset-es2015
// 2. 在配置文件中，module添加新的匹配规则：
//                          { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ } //exclude排除node_modules包下的js文件
// 3. 在项目的根目录下创建一个.babelrc配置文件，必须符合json规范：不能写注释，字符串必须双引号
//                          配置如下：(presets可以翻译为语法的意思)
//                                  "presets": ["env", "stage-0"],
//                                  "plugins": ["transform-runtime"]
class Person { //class是es6中提供的新语法，提供面向对象编程
    static info = {name: 'aaa', age: 10} //static可以定义静态属性，可以直接通过类型访问属性
}

console.log(Person.info);

var p1 = new Person();

//===========================================================================================
// webpack整合vue开发
//在普通网页中使用vue: 1. 先引入vue包  2. 在index中创建一个id为app的div容器 3. 通过new得到一个vm实例
//webpack整合： 1. npm i vue -S; 安装vue包为项目运行依赖
//import Vue from 'vue'; //这个导入的包没有以前导入的包功能全， 此功能不完整， 这个文件是从以下查找规则中查找到的
//包的查找规则： 1.在项目根目录node_modules中查找 
//              2. 在node_modules中查找对应的vue文件夹 
//              3. 在vue文件中找package.josn的配置文件 
//              4. 在文件中查找main属性，指定了这个包被加载时候的入口文件

// 第一种导入完整的vue
// import Vue from "../node_modules/vue/dist/vue.js"
//第二中导入方式， 在package.config.js中加一个resolve节点：
import Vue from 'vue'

// 导入vue定义的login组件， 还需要安装第三方loader: npm i vue-loader vue-template-compiler -D ; 
//在配置文件中新增配置项, 需要在plugins节点中添加：new VueLoaderPlugin(),并加入const VueLoaderPlugin = require('vue-loader/lib/plugin');
// import login from './login.vue'

//============================================================
//使用vue-router, 下载包： npm i vue-router -S
import VueRouter from 'vue-router'

// 手动安装router
Vue.use(VueRouter)

import App from './App.vue'

//引入抽离出去的router.js
import router from './router.js'

// =====================================================================
// 注意位置
//mint-ui的使用： 1. 安装 npm i mint-ui -S； 只是vue的组件，其他框架不能使用
//导入所有
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

//按需导入, 可以减少bundle.js文件大小
// 1. 安装插件npm install babel-plugin-component -D
import { Button, Cell } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)

//================================================================
// 引入mui样式, 和bootstrap使用一样
import './lib/mui/css/mui.min.css'

var vm = new Vue({
    el: "#app",
    data: {
        msg: '123'
    },
    // render: function(createElement) {
    //     return createElement(login); //在webpack中渲染徐建只能用render函数；
    // }

    //简写, 引入login组件
    render: c => c(App),
    router//将路由对象挂载到vm上
    
})
// webpack使用vue总结：
// 1. 安装vue包： npm i vue -S
// 2. 由于在webpack中，推荐使用.vue这个组件模板文件定义组件，所以， 需要安装能解析这种文件的loader
// 3. 在main.js中导入vue模块： import Vue from 'vue'
// 4. 定义一个.vue结尾的组件
// 5. 使用import导入组件
// 6. 创建vue实例， newVue, 内部传el，data，render函数（渲染组件）
// 7. 在页面中创建id为app的元素，作为vue实例要控制的区域

// 查看test.js
//接收export default暴露的成员
//{ title }接收export暴露成员， 切title固定，不能自定义，这种形式叫做按需导出
//as 是来起别名
import m1, { title as title123, content } from './test.js'
console.log(m1)
console.log(title123 + "--" + content)



