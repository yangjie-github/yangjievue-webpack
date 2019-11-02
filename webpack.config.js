const path = require('path')
const webpack = require('webpack')
//只要是插件，都放在plugun节点中
const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

//这个配置文件其实就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象
module.exports = {
    //指定入口和出口。简化webpack .\src\main.js .\disk\bundle.js
    entry: path.join(__dirname, './src/main.js'),//表示要使用webpack打包哪个文件, __dirname表示被执行 js 文件的绝对路径
    output: {//输出文件相关的配置
        path: path.join(__dirname, './disk'),
        filename: 'bundle.js'
    },
    // 也可以在package.json中加入： "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot" ; 
    //--open自动打开端口， --port 3000设置打开的端口； --contentBase src设置默认打开的文件； --hot修改文件之后,只热部署修改的代码，不是全局修改， 相当于打补丁，而且浏览器页面异步刷新；
    devServer: { //配置命令行参数第二种方式
        open: true,
        port: 4000,
        contentBase: 'src',
        hot: true,// 配置热部署还需要导入const webpack = require('webpack')， 并配置plugins;
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // new一个热更新模块对象
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),//根据此页面来来生成内存中的模板页面
            filename: 'index.html'//指定生成页面名称
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            //webpack 2.0 有每一个引入style-loade必须带loader后缀， 但是在2.0以前可以不用
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // loader调用顺序都是从右到左
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //less-loader内部会依赖less
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, //配置sass的loader
            { test: /\.jpg|png|gif|bmp|jpeg$/, use: 'url-loader?limit=20700&name=[hash:8]-[name].[ext]' }, //配置图片的loader， 内部依赖file-loader
            // 此时图片会被转为base64编码，可以较少二次请求， limit=7600表示在小于7600kb时候不会进行base64编码,会显示引用地址
            // 图片的名称会变化， 主要是防止图片的重名， [name].[ext]是使用原文件名和后缀名
            // 在页面上防止同样的引用地址，没有过重命名的话会存在覆盖问题， 可以在前面加上生成一个随机串，防止图片重名
            { test: /\.ttf|eot|woff|woff2|svg$/, use: 'url-loader' }, //处理字体文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //配置babel来解析es6语法
            { test: /\.vue$/, use: 'vue-loader' } //处理.vue文件的loader
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js" //修改导入vue的路径
        }
    }

    // 步骤一： 初始化webpack: npm init -y , 会生成package.json文件和node_moudules文件夹
    // 步骤二:  安装jquery: npm i jquery -s
    // 步骤三： 本地安装webpack: npm i webpack@3.4.1 -D
    // 步骤四： 本地安装webpack-web-server: npm i webpack-dev-sever@2.11.5 -D
    // 步骤五： 运行npm run dev, 此时程序会处于监听状态，一旦代码（main.js里面的代码）发生改变，ctrl + s, 页面会自动刷新；此时在src平级目录下会有一个虚拟的bundle.js文件在内存中， 读取速度快

    //注意这里安装webpack和webpack-dev-server的版本，都不要安装最新版本；
    //配置好入口和出口之后， 此时只需要输入webpack,就可以处理main.js为bundle.js， 会执行webpack.config.js配置
    //这还是需要每次输入webpack,若想直接保存生效，则需要安装webpack-dev-server@2.11.5；可以监听代码的改变，自动打包编译
        //1. 运行： cnpm i webpack-dev-server@2.11.5 -D； 把这个工具安装到项目的本地开发依赖 
        //2. 和webpack用法一样： 此时执行webpack-dev-server会报错，因为这是本地项目安装，无法把webpack-dev-server当做脚本命令在终端运行；只有安装全局的命令才能在终端执行
            //在package.json中配置"dev": "webpack-dev-server",此时可以执行npm run dev来执行；此时会报错，删除掉node_moudules，然后运行npm i, 会重新下载node_moudules及其依赖，
                //webpack-dev-server还需要在本地项目中安装npm install  webpack  -D(哪怕在全局已经安装过了也需要在本地再次安装)
                //also called "webpack". Did you name your project the same,项目名和webpack冲突，修改项目名和package.json的name名字
    
    //在内存中生成一份html页面:
    //1. 安装html-webpack-plugin: npm i html-webpack-plugin -D; 
    //2. 导入插件const htmlWebpackPlugin = require('html-webpack-plugin')
}