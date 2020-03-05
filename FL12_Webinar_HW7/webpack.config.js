const webpack = require('webpack');

const config = {
    entry: {
        app: "./src/js/app.js"
    },
    output: {
        filename: "app.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    mode: 'development'
};

module.exports = config;