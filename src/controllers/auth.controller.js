const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//function to create token using jwt
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};



const register = async (req, res) => {

    try {
      //checking if user exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

        
    // if new user, create it or allow to register;
    user = await User.create(req.body);
    token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    //checked if mail doesnt exist
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }

    //if email exists, check password;
    const match = user.checkPassword(req.body.password);

    // if password doesn't match
    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    // if it matches
    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };