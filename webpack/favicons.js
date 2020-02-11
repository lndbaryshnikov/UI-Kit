const FaviconsPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = function () {
  return {
    plugins: [
      new FaviconsPlugin({
        logo: path.resolve(__dirname, '../src/favicons/favicon.png'),
        prefix: 'favicons/',
        publicPath: '',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(png|svg)$/,
          include: path.resolve(__dirname, '../src/favicons'),
          loader: 'file-loader',
          options: {
            name: 'favicons/[name].[ext]',
          },
        },
      ],
    },
  };
};
