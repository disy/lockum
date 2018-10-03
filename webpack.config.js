const path = require('path');
const textDecoder = require

module.exports = {
  entry: './src/LocationApi.ts',
  mode: 'production',
  module: {
    rules:  [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: { hints: false },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
      path: __dirname,
      libraryTarget: 'var',
      library: 'lockum',
  }
};
