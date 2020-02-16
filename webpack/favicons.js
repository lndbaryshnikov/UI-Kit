const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
          include: path.resolve(__dirname, '../src/assets/favicons/site-favicons'),
          loader: 'file-loader',
          options: {
            name: 'assets/favicons/site-favicons/[name].[ext]',
          },
        },
        {
          test: /\.(svg|png|ico|xml|json|webmanifest)$/,
          include: path.resolve(__dirname, '../src/assets/favicons/ui-kit-demo-favicons'),
          loader: 'file-loader',
          options: {
            name: 'assets/favicons/ui-kit-demo-favicons/[name].[ext]',
          },
        },
      ],
    },
  };
};
