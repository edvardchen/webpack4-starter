import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default (env, argv) => {
  const DEV = argv.mode === 'development';
  const config = {
    entry: {
      app: './src/client.js'
    },
    cache: DEV,
    devtool: DEV && 'eval',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [
        new UglifyJSPlugin({
          cache: true,
          parallel: true
          // sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.NamedModulesPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: DEV ? '[name].css' : '[name].[hash].css',
        chunkFilename: DEV ? '[id].css' : '[id].[hash].css'
      }),
      DEV ? new webpack.HotModuleReplacementPlugin() : new BundleAnalyzerPlugin()
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader'
        }
      ]
    }
  };
  return config;
};
