const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const babel = require('./webpack/babel');
const pug = require('./webpack/pug');
const styleExtract = require('./webpack/style.extract');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const devserver = require('./webpack/devserver');
const providePlugin = require('./webpack/provide-plugin');

const PATHS = {
    src: path.join(__dirname, 'src/pages'),
    dist: path.join(__dirname, 'dist')
};
const common = merge([
    {
        entry: {
            'UI-Kit': PATHS.src + '/UI-Kit/UI-Kit.js',
            //'UI-Kit': PATHS.src + '/UI-Kit/UI-Kit.scss',
            'second': PATHS.src + '/second/second.js',
            //'second': PATHS.src + '/second/second.scss',
        },
        output: {
            path: PATHS.dist,
            filename: './js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'UI-Kit.html',
                chunks: ['UI-Kit'],
                template: PATHS.src + '/UI-Kit/UI-Kit.pug',
            }),
            new HtmlWebpackPlugin({
                filename: 'second.html',
                chunks: ['second'],
                template: PATHS.src + '/second/second.pug',
            }),
        ],
    },
    babel(),
    pug(),
    styleExtract(),
    images(),
    fonts(),
    providePlugin()
]);


module.exports = function(env){
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return merge([
            {},
            common,
            devserver()
        ]);
    }
};