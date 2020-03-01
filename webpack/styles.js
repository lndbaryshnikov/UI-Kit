const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function () {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true, config: { path: './postcss.config.js' } },
            },
            {
              loader: 'resolve-url-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/styles/variables/*.scss', './src/styles/mixins/*.scss'],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true, config: { path: './postcss.config.js' } },
            },
          ],
        },
      ],
    },
  };
};
