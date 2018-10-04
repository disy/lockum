var path = require("path");

module.exports = {
   entry: './src/index.ts',
   output: {
      filename: 'bundle.js',
      path: __dirname,
      libraryTarget: 'var',
      library: 'mylib',
   },
   module: {
      rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
         }
      ]
   },
   resolve: {
      extensions: [".ts", ".js"]
   }
}   

