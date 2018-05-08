import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LodashPlugin from 'lodash-webpack-plugin';

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
      filename: DEV ? '[name].js' : '[name].[chunkhash].js',
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
      new LodashPlugin(),
      new HtmlWebpackPlugin({
        cache: true,
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
      }),
      // non-numerical chunk name
      new webpack.NamedChunksPlugin(),
      // NamedModulesPlugin for HMR
      DEV ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
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
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 5120 // 5k
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true
              }
            }
          ]
        }
      ]
    }
  };
  return config;
};
