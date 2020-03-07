const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const extractCSS = require('./webpack/css.extract');
const images = require('./webpack/images');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    assets: 'assets/'
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const common = merge([
    {
        externals: {
            paths: PATHS
        },
        entry: {
            app: PATHS.src + '/app.js'
            // "index": PATHS.source + '/pages/index/index.js',
            // "blog": PATHS.source + '/pages/blog/blog.js'
        },
        output: {
            filename: `js/[name].[hash].js`,
            path: PATHS.dist
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: `${PATHS.src}/img`,
                to: `img`
            }, /*{
                from: `${PATHS.src}/${PATHS.assets}fonts`,
                to: `${PATHS.assets}fonts`
            }, */{
                from: `${PATHS.src}/static`,
                to: ''
            }]),
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/,'.html')}`
            })),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: 'vendors',
                        test: /node_modules/,
                        chunks: 'all',
                        enforce: true
                    },
                },
            },
        },
    },
    pug(),
    images(),
    extractCSS()
]);

module.exports = function (env) {
    if (env == 'production') {
        return merge([
            common
        ]);
    }
    if (env == 'development') {
        return merge([
            common,
            devserver()
        ])
    }
};