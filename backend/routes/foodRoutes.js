const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getFoodsHandler,
  getFoodHandler,
  createFoodHandler,
  updateFoodHandler,
  deleteFoodHandler,
} = require("../controllers/foodController");

router
  .get("/", getFoodsHandler)
  .get("/:id", getFoodHandler)
  .post("/", verifyJWT, createFoodHandler)
  .patch("/:id", verifyJWT, updateFoodHandler)
  .delete("/:id", verifyJWT, deleteFoodHandler);

module.exports = router;
