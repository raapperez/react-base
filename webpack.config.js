'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const LessPluginCleanCSS = require('less-plugin-clean-css');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


console.log(`Running webpack in ${env}`);

const _plugins = [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': `'${env}'` }),
    new ExtractTextPlugin('../css/[name].css')

];

if(env === 'production'){
    _plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const preLoaders = [];

module.exports = {
    entry: {
        'example': './frontend/src/js/example-entry.js'
    },
    output: {
        path: './public/js',
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
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
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
    plugins: _plugins
};