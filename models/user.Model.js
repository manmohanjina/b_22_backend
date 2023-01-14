const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  age: Number,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
