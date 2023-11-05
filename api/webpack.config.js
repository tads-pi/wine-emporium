// original source: https://github.com/jgeschwendt/serverless-prisma/blob/master/webpack.config.js
const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    target: 'node',
    entry: slsw.lib.entries,
    externals: [nodeExternals()],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './node_modules/.prisma/client/schema.prisma', to: './' }, // you may need to change `to` here.
            ],
        }),
    ],
    resolve: {
        extensions: [
            '.js',
            '.ts',
        ]
    },
}