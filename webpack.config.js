const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const NullPlugin = require('webpack-null-plugin');

const shouldRunServer = process.env.WEBPACK_RUN_SERVER === "true";
module.exports = {
  entry: [
    'babel-polyfill',
    shouldRunServer ? 'webpack/hot/poll?1000' : 'fs', // fs because it's a built-in module - any built-in should work
    './src/index.js',
  ],
  watch: shouldRunServer,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, shouldRunServer ? 'temp' : 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    shouldRunServer ? new StartServerPlugin('index.js') : new NullPlugin(),
    new webpack.NamedModulesPlugin(),
    shouldRunServer ? new webpack.HotModuleReplacementPlugin() : new NullPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
  externals: [nodeExternals({
    // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
    whitelist: ['webpack/hot/poll?1000'],
  })],
};
