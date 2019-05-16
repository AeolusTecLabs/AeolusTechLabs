const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.base');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = merge(webpackCommonConfig, {
    mode: "production",
    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, 'build'),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',

                }
            },
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            hash: true,
            
            minify:{
                removeAttributeQuotes:true,
            }
        }),

        new webpack.DefinePlugin({
            STATE: JSON.stringify('production')
        })
    ]
});
