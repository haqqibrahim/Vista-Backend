// IMPORT MODULES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const mongoosee = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: "6189ee97",
  apiSecret: "GKqr2oOgSqimKpmB",
  applicationId: "95e6783b-1585-4e2d-a7cd-aa4163396cc0",
  privateKey: "private.key",
});
// IMPORT ROUTES
const Preload = require("./Routes/preload");
const LandingPage = require("./Routes/landingpage");
const ArtisanRegister = require("./Routes/artisanregister");
const Artisanhome = require("./Routes/artisanhome");
const UserRegister = require("./Routes/userregister");
const Hire = require("./Routes/hire");
const UserLogin = require("./Routes/userlogin");
const ArtisanLogin = require("./Routes/artisanlogin");

// IMPORT MODELS
const Artisan = require("./models/Artisan");
const User = require("./models/User");

// INITIALIZE EXPRESS APP
const app = express();

// SETTING UP SESSION
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(Artisan.createStrategy());
passport.serializeUser(Artisan.serializeUser());
passport.deserializeUser(Artisan.deserializeUser());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// DATABASE CONNECTION
mongoosee.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Database connected");
});

// ROUTES
app.use("/", Preload);
app.use("/landingpage", LandingPage);
app.use("/artisanregister", ArtisanRegister);
app.use("/artisanhome", Artisanhome);
app.use("/userregister", UserRegister);
app.use("/hire", Hire);
app.use("/userlogin", UserLogin);
app.use("/artisanlogin", ArtisanLogin);
app.get("/call", (req, res) => {
  res.render("call");
});
app.use("/makecall", (req, res) => {
  vonage.calls.create(
    {
      to: [
        {
          type: "phone",
          number: "+2348123854855",
        },
      ],
      from: {
        type: "phone",
        number: "+234813582448",
      },
      ncco: [
        {
          action: "talk",
          text: "This is a text to speech call from Vonage",
        },
      ],
    },
    (error, response) => {
      if (error) console.error(error);
      if (response) console.log(response);
    }
  );
});

// Basic Authentication for session and cookies
function auth(req, res, next) {
  if (!req.user) {
    console.log("not logged in");
  } else {
    console.log("Logged in");
  }
}
app.use(auth);

// LISTENING ON PORT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
