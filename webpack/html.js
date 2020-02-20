const HtmlPlugin = require('html-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins({ source, index }) {
  const templateDirectories = fs.readdirSync(source);

  return templateDirectories.map((dirName) => {
    const outputFilename = dirName === index ? 'index' : dirName;

    return new HtmlPlugin({
      filename: `${outputFilename}.html`,
      template: `${source}/${dirName}/${dirName}.pug`,
    });
  });
}

module.exports = function (source) {
  return {
    plugins: generateHtmlPlugins(source),
  };
};
