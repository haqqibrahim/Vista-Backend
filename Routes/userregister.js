// IMPORT MODULES
const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const app = express();
const UserRegister = express.Router();

UserRegister.get("/", (req, res) => {
  res.render("userregister");
});

UserRegister.post("/", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      number: req.body.number,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("userregister");
        return;
      }
      passport.authenticate("local")(req, res, () => {
        console.log("User registered");
        res.redirect("/hire");
        return;
      });
    }
  );
});

module.exports = UserRegister;
