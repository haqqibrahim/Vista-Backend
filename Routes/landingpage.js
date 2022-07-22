// IMPORT MODULES
const express = require("express");
const LandingPage = express.Router();

// ROUTES
LandingPage.get("/", (req, res) => {
  res.render("landingpage");
})

module.exports = LandingPage;