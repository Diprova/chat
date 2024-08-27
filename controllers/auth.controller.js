const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(14);
const redis_client = require("../config/redis");
const jwt = require('jsonwebtoken');

async function Register(req, res) {
  const encrypt_password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    occupation: req.body.occupation,
    tools: req.body.tools,
    password: encrypt_password,
  });
  try {
    const saved_user = await user.save();
    res.json({
      status: true,
      message: "User has been successfully registered",
      data: saved_user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong", data: error });
  }
}

async function Login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email }).exec();
    const pwd_match = bcrypt.compareSync(password, user.password);
    if (user === null || !pwd_match) res.status(401).json({ status: false, message: "Email or Password is Invalid" });
    const token=await GenerateAccessToken(user)
    if (token){
      res.cookie('token', token.access_token, { maxAge:24 * 60 * 60 * 1000, httpOnly: true })
      res.cookie('userId', user._id.toString(), { maxAge: 24 * 60 * 60 * 1000});
    }
    return res.json({status: true, message: "Login success", data:true});
  } catch (error) {
    return res.status(401).json({status: true, message: "login fail", data: false});
  }
}

async function GenerateAccessToken(user){
  const access_token = jwt.sign({ data: user._id},process.env.JWT_ACCESS_SECRET,{ expiresIn: process.env.JWT_ACCESS_TIME });
  const refresh_token= await GenerateRefreshToken(user)
  return { access_token:access_token, refresh_token:refresh_token}
}

async function GenerateRefreshToken(user){
  const refresh_token=jwt.sign({data:user._id.toString()},process.env.JWT_REFRESH_SECRET,{expiresIn:process.env.JWT_REFRESH_TIME})
  const user_refresh_token= await redis_client.get(user._id.toString(),(err,data)=>data)
  if(!user_refresh_token){
    redis_client.set(user._id.toString(), JSON.stringify({token: refresh_token}))
    return refresh_token
  }else{
    return user_refresh_token
  }
}

module.exports = { Register, Login }
