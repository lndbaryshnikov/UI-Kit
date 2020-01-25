const path = require('path');
const merge = require('webpack-merge');
const babel = require('./webpack/babel');
const pug = require('./webpack/pug');
const styles = require('./webpack/styles');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const devServer = require('./webpack/dev-server');
const providePlugin = require('./webpack/provide-plugin');
const faviconsPlugin = require('./webpack/favicons-plugin');
const htmlPlugin = require('./webpack/html-plugin');

const PATHS = {
    src: path.join(__dirname, 'src/pages'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'ui-kit-demo': PATHS.src + '/ui-kit-demo/ui-kit-demo.js',
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
    },
    babel(),
    pug(),
    styles(),
    images(),
    fonts(),
    providePlugin(),
    htmlPlugin(PATHS),
    faviconsPlugin()
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
