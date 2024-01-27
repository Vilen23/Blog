const { User } = require("../models/usersmodel");
const bcrypt = require('bcrypt');
const { hashpass } = require("./pass.hash");

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    res.status(400).json({
      msg: "All fields are required",
    });
    return;
  }
  const hashedpass = await hashpass(password);
  const newUser = new User({
    username,
    password:hashedpass,
    email,
  });
  try {
    await newUser.save();
    res.status(200).json("Signup successful");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
};
