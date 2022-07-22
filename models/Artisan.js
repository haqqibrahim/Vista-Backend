// IMPORT MODULES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const ArtisanSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  profession: String,
  image: {
    data: Buffer,
    contentType: String,
  }
});

// USING PASSPORT-LOCAL-MONGOOSE
ArtisanSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Artisan", ArtisanSchema);
