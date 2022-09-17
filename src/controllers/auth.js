const User = require("../models/user.models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    return res.status(201).send({ user: { name: user.name }, token });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).send({ message: "Please provide all details" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  return res.status(200).send({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
