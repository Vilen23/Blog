const { User } = require("../models/usersmodel");
const bcrypt = require("bcrypt");
const { hashpass } = require("./pass.hash");
const { errorHandler } = require("../utils/error");

const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    next(errorHandler(400, "All the fields are required"));
  }
  const hashedpass = await hashpass(password);
  const newUser = new User({
    username,
    password: hashedpass,
    email,
  });
  try {
    await newUser.save();
    res.status(200).json("Signup successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
