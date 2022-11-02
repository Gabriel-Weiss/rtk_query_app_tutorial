const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer")) {
    res.status(401).json({ message: "Invalid Bearer token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Access token not corect" });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
