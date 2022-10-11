const express = require("express");
const router = express.Router();
const {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .get("/", getUsersHandler)
  .get("/:id", getUserHandler)
  .post("/", createUserHandler)
  .patch("/:id", updateUserHandler)
  .delete("/:id", deleteUserHandler);

module.exports = router;
