

const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //通过 npm 安装
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 压缩工具
// css单独打包插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // css自动加前缀兼容
const MiniCssExtractPlugin = require("mini-css-extract-plugin")  // 抽离css


module.exports = {
    mode:'development',
    entry:{
        app:PATH.resolve(__dirname,'../src/javascripts/app.js'),
        admin:PATH.resolve(__dirname,'../src/javascripts/admin.js')
    },
    output:{
        path:PATH.resolve(__dirname,'../dist'),
        filename:'[name]-[hash:6].js'
    },
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[  //插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            // inject:false
            hash:true,
            chunks:['app']
        }),
        new HtmlWebpackPlugin({
            template:'./src/admin.html',
            filename:'admin.html',
            hash:true,
            chunks:['admin']
        }),
        new CopyWebpackPlugin([{  
            from: PATH.resolve(__dirname,'../src/static'),
            to: PATH.resolve(__dirname,'../dist/static')
        }]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles/[name]-[hash:6].css',
            chunkFilename: "[id].css"
        })
    ],
    module:{  //loader
        rules:[
              {
                test: /\.(css|scss)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',  { loader: 'sass-loader'} ]
                             
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,  //超过8kb复制出去
                            outputPath:'img/'  //可以指定输出的文件夹
                        }
                    }
                ]
            },{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            },{
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            }
        ]
    }
}