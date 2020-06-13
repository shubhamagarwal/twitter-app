const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:4000";
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'PoKc1VEH0e4Uyx9J5QgcN7x05',
  consumer_secret: 'hwLuxVPcTMkyPbmJgzKXcGzTOUxjgZnHY13WxKPYppxnrCytUK',
  access_token_key: '150253857-1J0s47JZHKiu4Oz5xBrcg3zxJTPmYQwaQNytO2Ro',
  access_token_secret: 'acCogIrGPIclqcOtPqPmPQgDE6swJqLqwl7LCQFgqjAOA'
});
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log(req.user);
  console.log(req.headers)
  console.log('req------------------------');
  if (req.user) {
    const screenName = req.user.screenName;
    let docRef = db.collection('Users').doc(`${screenName}`);
    docRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          docRef.onSnapshot((doc) => {
            // do stuff with the data
            //console.log('document exist', doc.data())
            console.log('inside if')
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

// when login failed, send failed msg
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

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
