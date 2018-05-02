import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env, argv) => {
  const DEV = argv.mode === 'development';
  const config = {
    entry: {
      app: './src/client.js'
    },
    devtool: DEV && 'eval',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.NamedModulesPlugin(),
      DEV && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  return config;
};
