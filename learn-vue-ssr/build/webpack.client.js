const merge = require('webpack-merge');
const base = require('./webpack.base');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClientRenderPlugin = require('vue-server-renderer/client-plugin');

const resolve = p => {
  return path.resolve(__dirname, p);
};

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },
  plugins: [
    new ClientRenderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html')
    })
  ]
});
