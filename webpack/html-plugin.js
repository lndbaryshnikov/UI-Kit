const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(PATHS) {
  const templateDirectories = fs.readdirSync(PATHS.src);

  return templateDirectories.map((dirName) => {
    const outputFilename = dirName === 'ui-kit-demo' ? 'index': dirName;

    return new HtmlWebpackPlugin({
      filename: `${outputFilename}.html`,
      chunks: [dirName],
      template: `${PATHS.src}/${dirName}/${dirName}.pug`,
    });
  });
}

module.exports = function(PATHS) {
  return {
    plugins: generateHtmlPlugins(PATHS)
  };
};
