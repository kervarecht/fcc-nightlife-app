import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)))

app.get('/', (req, res) => {
    console.log("Accessing homepage on port 5000")
    res.send('Hello world.');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})