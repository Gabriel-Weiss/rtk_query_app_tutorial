const express = require("express");
const router = express.Router();
const {
  getRestaurantsHandler,
  createRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
} = require("../controllers/restaurantController");

router
  .route("/")
  .get(getRestaurantsHandler)
  .post(createRestaurantHandler)
  .patch(updateRestaurantHandler)
  .delete(deleteRestaurantHandler);

module.exports = router;
