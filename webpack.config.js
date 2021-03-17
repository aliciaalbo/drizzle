const webpack = require('webpack');
const config = {
    entry:  __dirname + '/src/index.js',
    output: {
        path: __dirname + '/static/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
            test: /\.(js|jsx)?/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
	    {
	    test: /\.css$/i,
		use: ["style-loader", "css-loader"],
            },
        ]
    }
};
module.exports = config;
