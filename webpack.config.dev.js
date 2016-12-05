'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const LessPluginCleanCSS = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

console.log(`Running webpack in ${env}`);

const preLoaders = [];

module.exports = {
    entry: {
        'example': ['./frontend/src/js/example-entry.js', 'webpack-hot-middleware/client']
    },
    output: {
        path: path.join(__dirname, 'public/assets'),
        publicPath: '/assets/',
        filename: '[name].js'
    },
    module: {
        preLoaders,
        lessLoader: {
            lessPlugins: [
                new LessPluginCleanCSS({
                    advanced: true,
                    compatibility: 'ie8'
                })
            ]
        },
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': `'${env}'` }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};