const router = require("express").Router();
const passport = require("passport");
const keys = require("../config/keys");
const admin = require('firebase-admin');
var Twitter = require('twitter');

const CLIENT_HOME_PAGE_URL = "http://localhost:4000";

var client = new Twitter({
  consumer_key: keys.TWITTER_CONSUMER_KEY,
  consumer_secret: keys.TWITTER_CONSUMER_SECRET,
  access_token_key: keys.TWITTER_ACCESS_TOKEN,
  access_token_secret: keys.TWITTER_TOKEN_SECRET
});

const serviceAccount = require('./serviceAccountKey.json');

//initialize admin SDK using serciceAcountKey
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


router.get("/login/success", (req, res) => {
  if (req.user) {
    const screenName = req.user.screenName;
    let docRef = db.collection('Users').doc(`${screenName}`);
    docRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          docRef.onSnapshot((doc) => {
            res.json({
              success: true,
              message: "user has successfully authenticated",
              user: req.user,
              data: doc.data().tweets,
              cookies: req.cookies
            });
          });
        } else {
          client.get('statuses/home_timeline', { screen_name: req.screenName, count: 50 }, function (err, tweets, response) {
            if (!err) {
              let tweetData = tweets.reduce((acc, tweet) => {
                acc = [...acc, {
                  'id': tweet.id,
                  'profileImage': tweet.user.profile_image_url_https,
                  'text': tweet.text,
                  'location': tweet.user.location,
                  'followersCount': tweet.user.followers_count,
                  'retweetCount': tweet.retweet_count,
                  'screenName': tweet.user.screen_name
                }];
                return acc;
              }, [])
              docRef.set({
                tweets: tweetData
              }).then((data) => {
                console.log('set response', data)
                res.json({
                  success: true,
                  message: "user has successfully authenticated",
                  user: req.user,
                  data: tweetData,
                  cookies: req.cookies
                });
              });
            } else {
              res.json({
                success: false,
                message: "Failed to fetch the tweets data",
                user: req.user,
                cookies: req.cookies
              });
            }
          })
        }
      });
  }
});


router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});


router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
