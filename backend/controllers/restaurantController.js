const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  findAllRestaurants,
  createRestaurant,
  findRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../services/restaurantService");

//  @description Get all restaurants
//  @route GET /restaurants
//  @access Public
const getRestaurantsHandler = asyncHandler(async (req, res) => {
  const restaurants = await findAllRestaurants();
  if (!restaurants?.length) {
    return res.status(400).json({ message: "No restaurants found." });
  }
  return res.json(restaurants);
});

//  @description Create a new restaurant
//  @route POST /restaurants
//  @access Private
const createRestaurantHandler = asyncHandler(async (req, res) => {
  const { name, price_level, avg_delivery_time } = req.body;

  if (!price_level || !avg_delivery_time || !name) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  //const duplicate = await findRestaurantByName(name);

  const restaurantObject = { name, price_level, avg_delivery_time };

  const created = await createRestaurant(restaurantObject);

  if (created) {
    res.status(201).json({
      message: `Restaurant ${restaurantObject.name} created successfully`,
    });
  } else {
    res.status(400).json({
      message: `Restaurant ${restaurantObject.name} could not be created`,
    });
  }
});

//  @description Update a restaurant
//  @route PATCH /restaurants
//  @access Private
const updateRestaurantHandler = asyncHandler(async (req, res) => {
  const { id, name, price_level, avg_delivery_time } = req.body;

  if (!id || !name || !price_level || !avg_delivery_time) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant not found." });
  }

  //const duplicate = await findRestaurantByName(name);

  restaurant.name = name;
  restaurant.price_level = price_level;
  restaurant.avg_delivery_time = avg_delivery_time;

  const updatedRestaurant = await restaurant.save();

  res.json({
    message: `Restaurant ${updatedRestaurant.name} updated successfully`,
  });
});

//  @description Delete a Restaurant
//  @route DELETE /Restaurants
//  @access Private
const deleteRestaurantHandler = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id parameter required" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const restaurant = await findRestaurantById(id);

  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant not found" });
  }

  const deletedRestaurant = await restaurant.deleteOne();

  res.json({
    message: `Restaurant ${deletedRestaurant.name} deleted successfully`,
  });
});

module.exports = {
  getRestaurantsHandler,
  createRestaurantHandler,
  updateRestaurantHandler,
  deleteRestaurantHandler,
};
