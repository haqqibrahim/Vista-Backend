// IMPORT MODULES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  number: Number,
});

// USING PASSPORT-LOCAL-MONGOOSE
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
