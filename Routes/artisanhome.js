// IMPORT MODULES
const express = require("express");
const Artisanhome = express.Router();

// ROUTES
Artisanhome.get("/", (req, res) => {
  res.render("artisanhome");
})

module.exports = Artisanhome;