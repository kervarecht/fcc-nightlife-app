import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)))



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})