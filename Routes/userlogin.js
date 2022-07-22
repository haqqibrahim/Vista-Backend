// IMPORT MODULES
const express = require("express");
const passport = require("passport");
const Login = express.Router();

const app = express();

// IMPORT DATA MODEL
const User = require("../models/User");
// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
Login.get("/", (req, res) => {
  res.render("userlogin");
});

Login.post("/", (req, res) => {
  // CHECK IF USER IS ARTISAN OR USER
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/userlogin");
      return;
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("User logged in");
        res.redirect("/hire");
        return;
      });
    }
  });
});

module.exports = Login;
