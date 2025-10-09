// Auth helpers using JWT
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function getUserFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.sub);
    return user || null;
  } catch (e) {
    return null;
  }
}

module.exports = { signToken, getUserFromToken };
