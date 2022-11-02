const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { findUserByUsername } = require("../services/userService");

//  @description Login user
//  @route POST /auth
//  @access public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const userFound = await findUserByUsername(username);

  if (!userFound) {
    return res.status(401).json({ message: "User not found." });
  }

  const userAuthenticated = await bcrypt.compare(password, userFound.password);

  if (!userAuthenticated) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const accessToken = jwt.sign(
    {
      userId: userFound._id,
      username: userFound.username,
      roles: userFound.roles,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: userFound.username },

    process.env.REFRESH_TOKEN,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ accessToken });
});

//  @description Refresh token
//  @route GET /auth/refresh
//  @access public
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "No cookie in request header" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token not corect" });
      }

      const userFound = await findUserByUsername(decoded.username);
      if (!userFound) {
        return res
          .status(401)
          .json({ message: "User not found in decoded token" });
      }

      const accessToken = jwt.sign(
        {
          userId: userFound._id,
          username: userFound.username,
          roles: userFound.roles,
        },

        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};

//  @description Logout user
//  @route POST /auth/logout
//  @access public
const logout = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared successfully" });
};

module.exports = { login, logout, refresh };
