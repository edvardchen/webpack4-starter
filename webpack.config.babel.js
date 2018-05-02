import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env, argv) => {
  const DEV = !!argv.mode === 'development';
  const config = {
    entry: {
      app: './src/client.js'
    },
    devtool: DEV && 'eval',
    plugins: [new HtmlWebpackPlugin()],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, DEV ? '.tmp' : 'dist')
    }
  };
  return config;
};
