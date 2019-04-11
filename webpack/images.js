const path = require('path');

module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|png|svg)$/,
                    include: path.resolve(__dirname, 'src/img'),
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    },
                }
            ]
        }
    };
};