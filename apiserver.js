import express from 'express';


const app = express();

app.get('/api/yelpreq', (req, res) => {
    console.log(req)
    res.send('Hello world.');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})