// IMPORT MODULES
const express = require("express");
const Userhome = express.Router();

// MODEL IMPORT
const Artisan = require("../models/Artisan");

// ROUTES
Userhome.get("/", (req, res) => {
  // GET ALL ARTISANS
  Artisan.find({}, (err, allArtisans) => {
    if (err) {
      console.log(err);
    } else {
      res.render("hire", { artisans: allArtisans });
    }
  });
});

module.exports = Userhome;
