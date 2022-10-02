const express = require("express");
const router = express.Router();
const {
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");

router
  .route("/")
  .get(getUsersHandler)
  .post(createUserHandler)
  .patch(updateUserHandler)
  .delete(deleteUserHandler);

module.exports = router;
