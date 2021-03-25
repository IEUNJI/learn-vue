const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServerRenderPlugin = require('vue-server-renderer/server-plugin');

const resolve = p => {
  return path.resolve(__dirname, p);
};

module.exports = merge(base, {
  entry: {
    server: resolve('../src/server-entry.js')
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ServerRenderPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      excludeChunks: ['server']
    })
  ]
});
