const faviconsPlugin = require('favicons-webpack-plugin');

module.exports = function(pathToIcon) {
  return {
    plugins: [
      new faviconsPlugin({
        logo: pathToIcon,
        prefix: 'assets/'
      }),
    ]
  };
};
