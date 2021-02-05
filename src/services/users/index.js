const express = require("express");
const userRoutes = express.Router();
const User = require("../../models/User");
const auth = require("../../utils/auth/privateRoutes");
const generateToken = require("../../utils/auth/generateToken");

//GET /api/users
//GET ALL USERS
userRoutes.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (err) {
    const error = new Error("There are no users");
    error.code = "400";
    next(error);
  }
});

//GET /api/users/me
//GET MY PROFILE
userRoutes.get("/me", auth, async (req, res, next) => {
  try {
    const user = req.user;
    const currentUser = await User.findById(user.id).select("-password");
    res.status(200).send({ currentUser });
  } catch (err) {
    const error = new Error("You are not authorized to see this user");
    error.code = "400";
    next(error);
  }
});

//POST //api/users
//REGISTER A USER
userRoutes.post("/", async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).send({ savedUser });
  } catch (err) {
    if (err.code === 11000)
      return next(new Error(`${Object.keys(err.keyValue)} already exist"`));
    const error = new Error("It was not possible to register a new user");
    error.code = "400";
    next(error);
  }
});

//POST  / api/auth/login;
//LOGIN
userRoutes.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(Error("It was not possible to login "));
    const validPass = await user.comparePass(password);
    if (validPass) {
      const { accessToken, refreshToken } = await generateToken(user, res);
      res.send({
        accessToken,
      });
    } else next(new Error("Username or password is wrong"));
  } catch (err) {
    console.log(err);
    const error = new Error("It was not possible to login ");
    error.code = "400";
    next(error);
  }
});

//DELETE /api/users
//DELETE a user
userRoutes.delete("/", auth, async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send({ user });
  } catch (err) {
    const error = new Error("There was a problem deleting this user");
  }
});
module.exports = userRoutes;
