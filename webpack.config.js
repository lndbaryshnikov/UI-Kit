const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const babel = require('./webpack/babel');
const pug = require('./webpack/pug');
const styles = require('./webpack/styles');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const devServer = require('./webpack/devServer');
const providePlugin = require('./webpack/provide-plugin');
const faviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src/pages'),
    dist: path.join(__dirname, 'dist')
};
const common = merge([
    {
        entry: {
            'UI-Kit': PATHS.src + '/ui-kit-demo-page/ui-kit-demo-page.js',
            'info': PATHS.src + '/info/info.js',
            'details': PATHS.src + '/details/details.js',
            'enroll': PATHS.src + '/enroll/enroll.js',
            'contact': PATHS.src + '/contact/contact.js',
        },
        output: {
            path: PATHS.dist,
            publicPath: './',
            filename: './js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['UI-Kit'],
                template: PATHS.src + '/ui-kit-demo-page/ui-kit-demo-page.pug',
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
            new faviconsWebpackPlugin({
                logo: './src/img/icons/favicon.png',
                prefix: 'assets/'
            })
        ],
    },
    babel(),
    pug(),
    styles(),
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
            devServer()
        ]);
    }
};
