const FaviconsPlugin = require('favicons-webpack-plugin');

module.exports = function (pathToIcon) {
  return {
    plugins: [
      new FaviconsPlugin({
        logo: pathToIcon,
        prefix: 'assets/',
      }),
    ],
  };
};
