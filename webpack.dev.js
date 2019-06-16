const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    // devtool:"source-map",
    //开发
    devtool: "cheap-module-eval-source-map",
    //线上
    // devtool: "cheap-module-source-map",
    entry: './src/main.js',
    // entry: ['babel-polyfill', './src/main.js'],
    // entry: ['@babel/polyfill','./src/main.js'],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        open: true,
        compress: true,
        port: 8901,
        hot: true,
        // hotOnly:true
    },
    output: {
        //cdn 地址
        publicPath: "/",
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
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
            //scss
            {
                test: /\.css|\.scss$/,  // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,// 让所有的 scss 都会重新使用 sass-loader postcss-loader 进行处理
                            modules: true //样式模块化 避免全局污染
                        }
                    },
                    "sass-loader",
                    "postcss-loader"] // 使用这两个loader来加载样式文件
            },
            //css
            {
                test: /\.css$/,  // 正则匹配所有.css后缀的样式文件
                use: ['style-loader',
                    "css-loader",
                    "postcss-loader"] // 使用这两个loader来加载样式文件
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

        ]
    },
    optimization:{
        usedExports:true
    },
    plugins: [
        //清空之前剩余的打包文件
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        },
            new webpack.HotModuleReplacementPlugin()
        )]
}