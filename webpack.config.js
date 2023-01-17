const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // mode
    mode: 'production', // production
    // entry
    entry: {
        main: path.resolve(__dirname, 'src/js/main.js')
    },
    // output
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name][contenthash].js',
        clean:true
    },
    // devServer
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public')
      },
      port: 3001,
      hot:true,
      open:true,
      compress:true,
      historyApiFallback: true
    },
    // loaders
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js']
      },
    // plugins
    plugins: [
      new HtmlWebpackPlugin({
        title: "Cars Racing",
        template: './src/indexTemp.html',
        filename: 'index.html',
        chunks: ['main']
      }),
      new MiniCssExtractPlugin()
    ]
}