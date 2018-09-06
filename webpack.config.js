'use strict';

//一  配置热加载服务器

//1 下载 webpack-dev-server   实时打包、实时刷新浏览器，开启服务器，自动打开浏览器
//cnpm install webpack-dev-server --save-dev

//2 下载html-webpack-plugin  会把打包好的js，插入到页面上
//cnpm install html-webpack-plugin --save-dev

//3 配置package.json中的scripts
//"dev": "webpack-dev-server --inline --hot --open --port 3000"

//4 运行  npm run dev
//报错   Error: Cannot find module 'webpack'
//本地安装webpack
// npm install webpack --save-dev

//5 运行还报错  Error: `output.path` needs to be an absolute path or `/`.
//webpack.config.js 中的output.path不可以是相对路径

//6 运行起来，但是没有显示页面，因为dev-server默认打开的页面是index.html

//7 此时运行html，没有执行js代码

//8 打包好的js插入页面   -- html-webpack-plugin

//二 配置es6==》es5

let path = require('path');
let webpack = require('webpack');
let htmlWebpackPlugin = require('html-webpack-plugin');
let {
  VueLoaderPlugin
} = require('vue-loader');
//let VueLoaderPlugin = require('vue-loader/lib/plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [{
        test: /\.css$/, //配置后缀名
        //css-loader   处理样式文件中的url()
        //style-loader  作用 是吧css代码，插入到网页中 style
        loader: 'style-loader!css-loader!postcss-loader' //loader执行的顺序从右到左
      },
      {
        test: /\.less$/, //配置后缀名
        loader: 'style-loader!css-loader!postcss-loader!less-loader' //loader执行的顺序从右到左
      },
      {
        test: /\.scss$/, //配置后缀名
        loader: 'style-loader!css-loader!postcss-loader!sass-loader' //loader执行的顺序从右到左
      },
      {
        //设置处理不同类型的文件
        test: /\.(jpg|gif|png|eot|svg|ttf|woff|otf)$/,
        loader: 'url-loader?limit=90000'
      },
      {
        //把js文件中的es6--》es5
        test: /\.js$/,
        exclude: /node_modules/, //排除指定内容
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: '页面标题', //生成页面标题
      filename: 'index.html',
      template: 'template.html'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        babel: {
          presets: ['es2015'],
          plugins: ['transform-runtime'] //为了转换.vue中的es6的语法
        }
      }
    }),
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    //      // 压缩js
    //      new webpack.optimize.UglifyJsPlugin({
    //          compress: {
    //              warnings: false
    //          },
    //          comments: false //去掉版权信息等注释
    //      }),
    // 代码顺序优化
    //      new webpack.optimize.OccurrenceOrderPlugin(),
    //复制本地文件
    new CopyWebpackPlugin([{
        from: 'statics',
        to: 'statics'
      },
      // {from: '../jpg'}
    ])
  ],
  //压缩js
  //  optimization: {
  //      minimizer: [
  //          new UglifyJsPlugin({
  //              uglifyOptions: {
  //                  compress: false
  //              }
  //          })
  //      ]
  //  }
}