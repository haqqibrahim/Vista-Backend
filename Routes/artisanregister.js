// IMPORT MODULES
const express = require("express");
const ArtisanRegister = express.Router();
const passport = require("passport");
const multer = require("multer");
const fs = require("fs");
// IMPORT ARTISAN MODEL
const Artisan = require("../models/Artisan");
// INITIALIZE EXPRESS APP
const app = express();

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(Artisan.createStrategy());
passport.serializeUser(Artisan.serializeUser());
passport.deserializeUser(Artisan.deserializeUser());

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// ROUTES
ArtisanRegister.get("/", (req, res) => {
  res.render("artisanregister");
});

ArtisanRegister.post("/", upload.single("picture"), (req, res) => {
  // CREATE NEW ARTISAN
  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString("base64");
  const finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer.from(encode_img, "base64"),
  };
  const newArtisan = new Artisan({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    profession: req.body.profession,
    image: {
      data: finalImg.image,
      contentType: finalImg.contentType,
    },
  });
  Artisan.register(newArtisan, req.body.password, (err, artisan) => {
    if (err) {
      console.log(err);
      res.render("artisanregister");
      return;
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("Artisan registered");
        console.log(artisan);
        res.redirect("/artisanhome");
        return;
      });
    }
  });
});

module.exports = ArtisanRegister;
