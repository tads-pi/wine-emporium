const path = require('path');
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './lambda.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lambda.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './node_modules/.prisma/client/schema.prisma', to: './' }, // you may need to change `to` here.
      ],
    }),
  ],
};
