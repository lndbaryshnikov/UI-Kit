const faviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new faviconsWebpackPlugin({
        logo: './src/img/icons/favicon.png',
        prefix: 'assets/'
      }),
    ]
  };
};
