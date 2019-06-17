var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        //cdn 地址
        publicPath: "/",
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //图片 小于 10240B 
                            limit: 10240,
                            name: '[name]_[hash].[ext]',
                            outputPath: "images/"
                        }
                    }
                ]
            },
            //字体文件打包
            {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader',
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

        ]
    },
    plugins: [
        //清空之前剩余的打包文件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    //tree shaking 仅仅加载使用的模块
    optimization: {
        usedExports:true,
        //代码分割
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }

    },
}