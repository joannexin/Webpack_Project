var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'react', 'lodash', 'redux', 'react-redux', 'react-dom',
	'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
  	bundle: './src/index.js',
  	vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // name should be exactly same as entry key, followed by un unique hashed number, 
    // the number will change whenever your file changes, so that your browser will
    // redownload
    filename: '[name].[chunkhash].js'
  },
  module: {
  	rules: [
  		{
  			use: 'babel-loader',
  			test: /\.js$/,
  			exclude: /node_modules/
  		},
  		{
  			// css-loader allow webpack to understand and read the content of css file,
  			// style-loader takes all those css modules and stick them into a style tag into html file
  			use: ['style-loader', 'css-loader'],
  			test: /\.css$/
  		}
  	]
  },
  plugins: [
  	// webpack look all the entry points, if any modules in the tree are duplicate,
  	// pull them out and only add them to vendor.js 
  	new webpack.optimize.CommonsChunkPlugin({
  		name: ['vendor', 'mamifest']
  	}),
  	// We might change number and name of script tags, this plugin will find
  	// all the script that are generated, and add script tags to index.html; we
  	// a template because we want to some of the markups in our index.html
  	new HtmlWebpackPlugin({
  		template: 'src/index.html'
  	}),
  	new webpack.DefinePlugin({
  		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  	})
  ]
};
