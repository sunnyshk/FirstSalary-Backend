const User = require("../models/user.models");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({ message: "Authorization failed" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    return res.status(401).send({ message: "Authorization failed" });
  }
};

module.exports = auth;
