const cookieSession = require("cookie-session");
const express = require("express");
const path = require('path');
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser"); 
const publicPath = path.join(__dirname, '..', 'build');


app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.send(path.join(publicPath, 'index.html'))
});
app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);


app.use(cookieParser());


app.use(passport.initialize());

app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
