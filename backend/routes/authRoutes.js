const express = require("express");
const router = express.Router();
const { login, logout, refresh } = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

router
  .post("/", loginLimiter, login)
  .get("/refresh", refresh)
  .post("/logout", logout);

module.exports = router;
