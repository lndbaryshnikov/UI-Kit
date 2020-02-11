const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg)$/,
          include: path.resolve(__dirname, '../src'),
          exclude: [
            path.resolve(__dirname, '../src/fonts'),
            path.resolve(__dirname, '../src/favicons'),
          ],
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
  };
};
