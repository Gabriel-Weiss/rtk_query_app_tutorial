const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getRestaurantsHandler,
  getRestaurantHandler,
  createRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
} = require("../controllers/restaurantController");

router
  .get("/", getRestaurantsHandler)
  .get("/:id", getRestaurantHandler)
  .post("/", verifyJWT, createRestaurantHandler)
  .patch("/:id", verifyJWT, updateRestaurantHandler)
  .delete("/:id", verifyJWT, deleteRestaurantHandler);

module.exports = router;
