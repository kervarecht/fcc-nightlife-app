import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

export default {
    entry: {
        app: './client/index.js',
        login: './client/login.js'},
    output: {
        path: '/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            use: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, 
        {
            use: ['style-loader', 'css-loader'],
            test: /\.css/
        },
        {
            test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "sass-loader", options: {
                  sourceMap: true
              }
          }]
        } ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            myPageHeader: "The Index Page",
            filename: "index.html",
            template: 'client/index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            myPageHeader: "Log In",
            filename: "login.html",
            template: 'client/login.html',
            chunks: ['login']
        }),
        new LiveReloadPlugin()
     ]
};