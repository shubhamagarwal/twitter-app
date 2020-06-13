const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
// const User = require("../models/user-model");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((user, done) => {
  // User.findById(id)
  //   .then(user => {
  //     done(null, user);
  //   })
  //   .catch(e => {
  //     done(new Error("Failed to deserialize an user"));
  //   });
  // const currentUser = {id: '123'};
  // done(null, currentUser);
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      const loggedInUser = {abc: profile._json.name, screenName:profile._json.screen_name, id:  profile._json.id_str, profileImage: profile._json.profile_image_url};
      done(null, loggedInUser);
    }
  )
);
