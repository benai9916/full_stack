const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = String(req.cookies.token).trim();
    if (!token) res.status(401).json({ errorMessage: "Unauthorized" });
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = auth;
