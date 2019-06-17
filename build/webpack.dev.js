
const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        open: true,
        compress: true,
        port: 8909,
        hot: true,
        // hotOnly:true
    },
    module: {
        rules: [
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

        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig, devConfig)