const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base');
const path = require('path');
const webpack = require('webpack');



module.exports = merge(webpackConfig, {
	mode: 'development',
	devtool: "inline-source-map",

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(jpg|jpeg|png|gif)$/,
				loader: 'file-loader',
				options: {
					limit: 8192,
					name: '[name].[hash].[ext]',
					outputPath: 'images/',
				},
			},
			{
				test: /\.(woff|woff2|svg|eot|ttf)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'font/',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.(css|less|scss)$/,
				use: [
					'css-loader',
					'postcss-loader',
					'less-loader',
					'scss-loader'
				]
			},
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		inline: true,
		host: '0.0.0.0',
		port: 9000
	},
	

	plugins: [
		new webpack.DefinePlugin({
			STATE: JSON.stringify('development')
		})
	],
	watchOptions: {
		aggregateTimeout: 500,
		poll: 1000,
		ignored: /node_modules/
	},

});
















/*
const merge = require('webpack-merge');


module.exports = function(env){
	const common = require('./webpack.common.js')(env);

	const commonPath = common.output.path;
	const dirpath = commonPath.substring(commonPath.lastIndexOf("build"));
	const dirpaths = dirpath.replace(/\\/g, "/");
	const publicPath = "./../" + dirpaths + "/"; //开发环境的路径

	return merge(common, {
		devtool: 'inline-source-map',
		devServer: {
			contentBase: publicPath //监听代码变化自动提交并刷新网页
		}
	})
};
*/