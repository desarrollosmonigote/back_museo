const jwt = require("jsonwebtoken");
const SECRET = "milanesa";

const generateToken = (payload) => {
  return jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
};

const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

const generateClientToken = (payload) => {
  return jwt.sign({ client: payload }, SECRET, { expiresIn: "10m" });
};

const validateClientToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return { message: error.message };
  }
};

module.exports = {
  generateToken,
  validateToken,
  generateClientToken,
  validateClientToken,
};
