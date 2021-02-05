const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlist: [],
  favoriteSongs: [],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    const error = new Error("Password not valid");
  }
});

userSchema.methods.comparePass = async function (pass) {
  try {
    const isValid = await bcrypt.compare(pass, this.password);
    return isValid;
  } catch (err) {
    return false;
  }
};

module.exports = mongoose.model("users", userSchema);
