
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
    //tree shaking 仅仅加载使用的模块
    optimization:{
        usedExports:true
    },
    plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
}

module.exports = merge(baseConfig,devConfig)