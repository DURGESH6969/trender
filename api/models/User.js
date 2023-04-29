const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String
}, {timestamps: true});

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel;