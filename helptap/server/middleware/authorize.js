const jwt = require("jsonwebtoken");
const { error } = require("../utils/apiResponse");

const auth = (req, res, next) => {
  try {
    const token = String(req.cookies.token).trim();
    if (!token)
      return res.status(401).json(error("unauthorized", res.statusCode));
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verify.user;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json(error("unauthorized", res.statusCode));
  }
};

module.exports = auth;
