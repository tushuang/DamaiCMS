

const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //通过 npm 安装
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode:'development',
    entry:{
        app:PATH.resolve(__dirname,'../src/javascripts/app.js'),
        login:PATH.resolve(__dirname,'../src/javascripts/login.js')
    },
    output:{
        path:PATH.resolve(__dirname,'../dev'),
        filename:'[name].js'
    },
    devServer:{
        //让服务器从这个目录中响应资源
        contentBase:PATH.resolve(__dirname,'../dev'),
        port:9000,
        compress:true,
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                pathRewrite: { // https://m.lagou.com/abc
                    '^/api': ''
                }
            }
        }
    },
    plugins:[  //插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            // inject:false
            hash:true
        }),
        new HtmlWebpackPlugin({
            template:'./src/login.html',
            filename:'login.html',
            hash:true,
            chunks:['login']
        }),
        new CopyWebpackPlugin([{  
            from: PATH.resolve(__dirname,'../src/static'),
            to: PATH.resolve(__dirname,'../dev/static')
         }
        //{
        //     from:PATH.resolve(__dirname,'../src/pages'),
        //     to:PATH.resolve(__dirname,'../dev/pages')
        // }
        ])
    ],
    module:{  //loader
        rules:[
            {
                test:/\.(css|scss)$/,
                use:[  //loader从后往前解析
                    {loader:'style-loader'},
                    {loader:'css-loader'},
                    {loader:'sass-loader'}
                ]
            },{
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