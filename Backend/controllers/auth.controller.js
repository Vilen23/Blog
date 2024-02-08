const { User } = require("../models/usersmodel");
const bcrypt = require("bcrypt");
const { hashpass } = require("./pass.hash");
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");

//Sign Up API
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

//Sign in API
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
        isAdmin: validuser.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validuser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//Google Login API
const google = async (req, res, next) => {
  const { name, email, googlephotourl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatepass = Math.random().toString(36).slice(-8);
      const hashpassword = await bcrypt.hash(generatepass, 10);
      const user = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: hashpassword,
        profilepicture: googlephotourl,
        email: email,
      });
      await user.save();
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//Update Information API
const update = async (req, res, next) => {
  const { username, email, password, profilepicture, _id } = req.body;

  try {
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the password is provided and changed
    if (password) {
      const isPassChanged = await bcrypt.compare(password, user.password);

      if (!isPassChanged) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate(
          { _id },
          { username, email, password: hashedPassword, profilepicture }
        );
      }
    } else {
      // If no password is provided, update other fields including the password
      const update = await User.findOneAndUpdate(
        { _id },
        { username, email, password: user.password, profilepicture }
      );
    }
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteuser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

const deleteuserbyadmin = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(401, "You are not allowed to delete users"))
  } 
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
}

const getUsers = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(401, "You are not allowed to view all users"))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const userWithoutPass = users.map((user)=>{
      const {password,...rest} = user._doc;
      return rest;
    })
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      users:userWithoutPass,
      totalUsers,
      lastMonthUsers,
    })
  } catch (error) {
    next(error);
  }
};


 const getuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  signup,
  signin,
  google,
  update,
  deleteuser,
  getUsers,
  deleteuserbyadmin,
  getuser
};
