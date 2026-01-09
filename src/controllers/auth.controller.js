//api ke andr ky ky haoga uske kam mein ayengi

/*
post register
post login 
get user[protected]
*/

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const isUserAlreadyExsist = await userModel.findOne({
    username,
  });
  if (isUserAlreadyExsist) {
    return res.status(409).json({
      message: "username already exsist",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10), //password conversion to hash
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); //password jo aaya hai user se usko bhi hash mai convert krte hai and compare krte hai

  if (!isPasswordValid) {
    return res.status(400).json({ message: "invalid password" });
  }

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    username: user.username,
    id: user._id,
  });
}

module.exports = {
  registerController,
  loginController,
};
