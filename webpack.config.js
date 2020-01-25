const path = require('path');
const fs = require('fs');
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

function generateHtmlPlugins() {
    const templateDirectories = fs.readdirSync(PATHS.src);

    return templateDirectories.map((dirName) => {
        const outputFilename = dirName === 'ui-kit-demo' ? 'index': dirName;

        return new HtmlWebpackPlugin({
            filename: `${outputFilename}.html`,
            chunks: [dirName],
            template: `${PATHS.src}/${dirName}/${dirName}.pug`,
        });
    });
}

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
        plugins: generateHtmlPlugins()
          .concat([
            new faviconsWebpackPlugin({
                logo: './src/img/icons/favicon.png',
                prefix: 'assets/'
            })
        ]),
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
