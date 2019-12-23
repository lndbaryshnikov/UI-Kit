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
            'info': PATHS.src + '/info/info.js',
            'details': PATHS.src + '/details/details.js',
            'enroll': PATHS.src + '/enroll/enroll.js',
            'contact': PATHS.src + '/contact/contact.js',
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
                filename: 'info.html',
                chunks: ['info'],
                template: PATHS.src + '/info/info.pug',
            }),
            new HtmlWebpackPlugin({
                filename: 'details.html',
                chunks: ['details'],
                template: PATHS.src + '/details/details.pug',
            }),
            new HtmlWebpackPlugin({
                filename: 'enroll.html',
                chunks: ['enroll'],
                template: PATHS.src + '/enroll/enroll.pug',
            }),
            new HtmlWebpackPlugin({
                filename: 'contact.html',
                chunks: ['contact'],
                template: PATHS.src + '/contact/contact.pug',
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
