import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

const apiKey = 'Bearer ' + process.env.YELP_API_KEY
const apiHeader = {
    headers : {
        Authorization: apiKey
    }
}
const yelpAPI = 'https://api.yelp.com/v3/businesses/search?location='

app.get('/api/yelpreq', (req, res) => {
    const location = yelpAPI + req.query.search;
   
    axios.get(location, apiHeader)
    .then(response => {
        res.send(response.data.businesses);
    })
    .catch(error => console.log(error));

    
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})