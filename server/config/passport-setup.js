const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((user, done) => {
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
