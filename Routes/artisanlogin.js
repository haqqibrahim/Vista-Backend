// IMPORT MODULES
const express = require("express");
const passport = require("passport");
const Login = express.Router();

const app = express();

// IMPORT DATA MODEL
const Artisan = require("../models/Artisan");
// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(Artisan.createStrategy());
passport.serializeUser(Artisan.serializeUser());
passport.deserializeUser(Artisan.deserializeUser());

// ROUTES
Login.get("/", (req, res) => {
  res.render("artisanlogin");
});

Login.post("/", (req, res) => {
  Artisan.findOne({username: req.body.username}, (err, user) => {
    if(err) {
      console.log(err);
      res.redirect("/artisanlogin");
      return;
    } else {
      console.log(user.username);
      console.log("Artisan logged in");
      res.redirect("/artisanhome");
    }
  })
})
module.exports = Login;
