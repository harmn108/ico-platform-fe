const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: './server.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  target: 'node',
   externals: [nodeExternals({
     whitelist: [
       /^@angular\/material/,
       /^@ngx-translate\/core/
     ]
   })],
  node: {
    __dirname: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
