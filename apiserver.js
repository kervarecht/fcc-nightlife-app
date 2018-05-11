const express = require('express');
const app = express();
const session = require('express-session');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const https = require('https');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const LogOps = require('./db/login-ops.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//===EXPRESS STUFF===//
app.use(session({  
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false,
    maxAge: 60000 }
  }));
app.use(cookieparser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'db')))

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
    callbackURL: "/auth/google/callback",
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
      LogOps.login(thisUser, url, function(result){
          console.log("Logged in.");
      })
      req.session.success = 'You are successfully logged in ' + profile.displayName + '!';
      return done(null, profile);
      }
      if (!profile) {
        console.log("COULD NOT LOG IN");
        return done(null, profile);
      }
  }
));

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
let searched;
const apiKey = 'Bearer ' + process.env.YELP_API_KEY
const apiHeader = {
    headers : {
        Authorization: apiKey
    }
}
const yelpAPI = 'https://api.yelp.com/v3/businesses/search?location='

//======ROUTES=====//
app.get('/', (req, res) => {
    res.render('./dist/index.html');
});

app.get('/api/yelpreq', (req, res) => {
    console.log("Received Yelp API Call");
    const location = yelpAPI + req.query.search;
    searched = req.query.search;
    axios.get(location, apiHeader, function(err, response){
        if (err) throw err;
        console.log("Response: " + response);
        console.log("Error: " + err);
        res.send(response.data.businesses);
    });
});

app.get('/user', (req, res) => {
    // console.log("User request received.")
    if (!req.user){
        res.send("Not logged in yet.");
    }
    else {
    LogOps.find(req.user.emails[0].value, process.env.DATABASE, function(user){
        if (user == false){
            res.send("User not found");
        }
        else {
            res.send({'user': user});
        }
    });  
}});

app.get('/addgoing', (req, res) => {

    if (!req.user){
        res.send("Not logged in yet");
    }
    else {
    const id = req.query.going;

    LogOps.addGoing(req.user, id, process.env.DATABASE, function(result){
        res.send({data: result.nModified});
    })
}
});

app.get('/removegoing', (req, res) => {
    if (!req.user){
        res.send("Not logged in yet");
    }
    else {
        const id = req.query.going
        LogOps.removeGoing(req.user, id, process.env.DATABASE, function(result){
            res.send({data: result.nModified})
        })
    }
});

app.get('/searched', (req, res) => {
    if (!searched){
        res.send(false);
    }
    else {
        res.send(searched);
    }
})

//authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
  passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/fail'
  })
);

app.get('/logout', (req, res) => {
    var name = req.user.username;
    console.log("Logging out " + name);
    req.logout();
    res.redirect('/');
})
//=====PORT AND RUN====//
const port = process.env.PORT;

app.listen(port, () => {
    console.log("Listening on port " + port);
}) 