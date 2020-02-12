const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
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
