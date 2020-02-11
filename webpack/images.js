const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|svg)$/,
          include: path.resolve(__dirname, '../src'),
          exclude: [
            path.resolve(__dirname, '../src/fonts'),
            path.resolve(__dirname, '../src/favicons'),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
              },
            },
          ],
        },
      ],
    },
  };
};
