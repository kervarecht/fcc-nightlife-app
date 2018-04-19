import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get('/api/yelpreq', (req, res) => {
    console.log(req.query.search);
    res.send('Hello world.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})