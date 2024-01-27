const { User } = require("../models/usersmodel");
const bcrypt = require("bcrypt");
const { hashpass } = require("./pass.hash");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

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

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
      const validuser = await User.findOne({ username });
      if (!validuser) {
          return next(errorHandler(400, "User not found"));
        }

    const validpass = await bcrypt.compare(password, validuser.password);
    if (!validpass) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign(
      {
        id: validuser._id,
      },
      process.env.JWT_SECRET
    );
    const {password:pass,...rest} = validuser._doc;
    res.status(200).cookie("access_token", token, {
        httponly: true,
      }).json(rest);
      
  } catch (error) {
    
    next(error);
  }
};

module.exports = {
  signup,
  signin
};
