const express = require('express');
const path = require('path');

const app = express();

// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));


if (process.env.NODE_ENV !== 'production') {
	// webpackMiddleware only serves incoming request and hand to webpack
	const webpackMiddleware = require('webpack-dev-middleware');
	// webpack compiles all the applications assets
	const webpack = require('webpack');
	// webpackConfig makes sure how webpack run correctly
	const webpackConfig = require('./webpack.config.js');
	app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
	app.use(express.static('dist'));
	app.get('*', (req, res) => {
		res.sendFile(path.joing(__dirname, 'dist/index.html'));
	});
}


app.listen(process.env.PORT || 3050, () => console.log('listening'));