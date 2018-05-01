import express from 'express';
const app = express();
import session from 'express-session';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
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
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false,
    maxAge: 60000 }
  }));
app.enable('trust proxy');
app.use(cors({credentials: true, origin: 'http://localhost:5000'}));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cookieparser());
app.use(bodyparser.json());

//===PASSPORT STUFF===//
app.use(passport.initialize());
app.use(passport.session());

//====Session===//
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});
//===GOOGLE PASSPORT STRATEGY===//
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, done) {
      const url = process.env.DATABASE;
    console.log('Our user authenticated with Google.');
    console.log(profile);
    
      if (profile) {
          req.session.user = profile;
        console.log("LOGGED IN AS: " + profile.displayName);
        const thisUser = {
          name: profile.displayName,
          email: profile.emails[0].value
      }
      LogOps.login(thisUser, url)
      req.session.success = 'You are successfully logged in ' + profile.displayName + '!';
      return done(null, profile);
      }
      if (!profile) {
        console.log("COULD NOT LOG IN");
        return done(null, profile);
      }
  }
));

//serialize and deserialize
//serialize and de-serialize
passport.serializeUser(function(user, done){
    console.log("Serializing user " + user.displayName);
    done(null, user);
 });
 
 passport.deserializeUser(function(obj, done){
    console.log("Deserializing user " + obj);
    done(null, obj);
    
 });


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

app.get('/user', (req, res) => {
    console.log("User request received.")
    if (!req.user){
        res.send("Not logged in yet.");
    }
    else {
    LogOps.find(req.user.emails[0].value, process.env.DATABASE)
    .then(user => {
        console.log(user);
        if (user == false){
            res.send("User not found");
        }
        else {
            res.send({'user': user});
        }
    })
    
  
}});

//authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: 'http://localhost:5000/',
      failureRedirect: '/fail'
  })
);

//=====PORT AND RUN====//
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port);
}) 