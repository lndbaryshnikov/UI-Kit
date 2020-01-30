const faviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new faviconsWebpackPlugin({
        logo: './src/img/favicon.png',
        prefix: 'assets/'
      }),
    ]
  };
};
