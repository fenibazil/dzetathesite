const path = require('path');

module.exports = {
  mode: 'development',
  
  entry: './js/src/script.js',
  
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, 'js'),
  },
  
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  
  devtool: 'source-map',
};