const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './app/app.js',
  output: {
    filename: 'myBundle.[hash].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './app/index.html' })],
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'docs'),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3.2,
                  useBuiltIns: 'usage',
                  targets: 'defaults',
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

if (currentTask === 'build') {
  config.mode = 'production';
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'main.[hash].css' })
  );
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;
}

module.exports = config;
