const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const historyApiFallback = require('connect-history-api-fallback');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output:{
    path: path.resolve(__dirname,'../public'),
    filename: 'bundle.js',
  },
  devServer:{
    static:{
      directory: path.resolve(__dirname,'../public'),
    },
    port:3000,
    open:true,
    hot:true,
    compress:true,
    historyApiFallback:true,
   proxy: [
    {
      context: ['/api'],
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  ]
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader' , 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader',
          options:{
            presets:['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'webpack App',
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};