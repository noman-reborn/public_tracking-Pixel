let { User } = require("../models/user.model.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  let { username, email, password } = req.body;
  let existingUser = await User.findOne({
    username: username,
    email: email,
  });
  try {
    // if (!existingUser.username || !existingUser.email) {
    //   return res.status(400).json({
    //     error: "User not found",
    //   });
    // }
    const isExists = await bcrypt.compare(password, existingUser?.password);
    console.log("existingUser", isExists, existingUser);
    if (!existingUser || !isExists) {
      const error = Error("Wrong details please check at once");
      return next(error);
    }
    console.log(existingUser);
  } catch (error) {
    const errors = new Error("wrong details please check at once");
    return next(errors);
  }

  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "kdjfa;sidupasdnf;aksdvuhisdvhisudfhpiusdhfpaiusyfhnakscjnvlkjxcnvlasudhfoiusyhfajksdnvzkjsdvhlksd",
      { expiresIn: "15d" }
    );
  } catch (err) {
    const error = new Error("Wrong details please check at onece");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    },
  });
};
const signupUser = async (req, res, next) => {
  const { username, email, password, address } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "THisIsTheSuperSEcretkey",
      { expiresIn: "1d" }
    );
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  res.status(201).json({
    success: true,
    data: { userId: newUser.id, email: newUser.email, token: token },
  });
};

const logoutUser = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  let bearerToken = authHeaders.split(" ")[1];
  console.log("logout controller", bearerToken);

  jwt.sign(authHeaders, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      return res.send({ msg: "You have been Logged Out" });
    } else {
      return res.send({ msg: err });
    }
  });
};

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
};
