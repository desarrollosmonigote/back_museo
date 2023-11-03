const { validateToken, validateClientToken } = require("../config/token");

function validateAdmin(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    const { user } = validateToken(token);
    if (!user) return res.sendStatus(401);
    req.user = user;
  } catch (error) {
    res.send({ message: error.message });
  }
  next();
}

function validateClient(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  const { client } = validateClientToken(token);
  if (!client) return res.sendStatus(401);
  next();
}

module.exports = { validateAdmin, validateClient };
