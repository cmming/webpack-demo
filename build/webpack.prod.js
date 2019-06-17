const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode: "production",
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            //scss
            {
                test: /\.css|\.scss$/,  // 正则匹配所有.css后缀的样式文件
                use: [MiniCssExtractPlugin.loader,
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
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"] // 使用这两个loader来加载样式文件
            },

        ]
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
      },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
}

module.exports = merge(baseConfig, prodConfig)