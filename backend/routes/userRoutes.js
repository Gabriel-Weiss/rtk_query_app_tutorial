const express = require("express");
const router = express.Router();
const {
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .get("/", getUsersHandler)
  .post("/", createUserHandler)
  .patch("/:id", updateUserHandler)
  .delete("/:id", deleteUserHandler);

module.exports = router;
