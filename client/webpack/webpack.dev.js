const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')

module.exports = merge(webpackBaseConfig, {
    devtool: 'inline-source-map',

    devServer: {
        contentBase: '../dist',
        inline:true,
        port: 9088,
        proxy: {//proxy backend api
            '/api': 'http://localhost:3000'
        }
    }
    
})