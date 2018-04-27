import express from 'express';
const app = express();
import session from 'express-session';
import cors from 'cors';
import bodyparser from 'body-parser';
import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import LogOps from './db/login-ops';
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//===EXPRESS STUFF===//
app.use(session({  
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: false,
    saveUninitialized: false,
  }));

//===PASSPORT STUFF===//
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('Our user authenticated with Google, and Google sent us back this profile info identifying the authenticated user:', profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//serialize and deserialize
//serialize and de-serialize
passport.serializeUser(function(user, done){
    console.log("Serializing user " + user.username);
    done(null, user);
 });
 
 passport.deserializeUser(function(obj, done){
    console.log("Deserializing user " + obj);
    done(null, obj);
    
 });


//====APP STUFF====//
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


//=====YELP API CALL STUFF====//
const apiKey = 'Bearer ' + process.env.YELP_API_KEY
const apiHeader = {
    headers : {
        Authorization: apiKey
    }
}
const yelpAPI = 'https://api.yelp.com/v3/businesses/search?location='

//======ROUTES=====//
app.get('/api/yelpreq', (req, res) => {
    const location = yelpAPI + req.query.search;
   
    axios.get(location, apiHeader)
    .then(response => {
        res.send(response.data.businesses);
    })
    .catch(error => console.log(error));

    
});

app.post('/login', (req, res) => {
    const url = process.env.DATABASE;
    console.log(req);
    const user = {
        email: req.body.params.email,
        name: req.body.params.name
    }
    //handle response, .then() causing issues
    LogOps.login(user, url)
    .then(response => {
        console.log(response);
        res.send(response);
    });

});

//authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/', {user: req.user});
  });

//=====PORT AND RUN====//
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
})