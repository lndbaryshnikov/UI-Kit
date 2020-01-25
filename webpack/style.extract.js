const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader',
                        use: [
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
                                options: { sourceMap: true }
                            },
                            {
                                loader: 'sass-loader',
                                options: { sourceMap: true },
                            },
                        ],
                    }),
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: { sourceMap: true },
                            },
                            {
                                loader: 'postcss-loader',
                                options: { sourceMap: true, config: { path: './postcss.config.js' } },
                            },
                        ],
                    }),
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: './css/[name].css',
            }),
        ]
    };
};
