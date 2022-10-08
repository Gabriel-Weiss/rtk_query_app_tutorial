const Restaurant = require("../models/Restaurant");

const findAllRestaurants = async () => {
  return await Restaurant.find().lean();
};

const createRestaurant = async (restaurant) => {
  return await Restaurant.create(restaurant);
};

const findRestaurantById = async (id) => {
  return await Restaurant.findById(id).exec();
};

const updateRestaurant = async (id, restaurant) => {
  return await Restaurant.findByIdAndUpdate(id, restaurant).exec();
};

const deleteRestaurant = async (restaurant) => {
  return await restaurant.deleteOne();
};

module.exports = {
  findAllRestaurants,
  createRestaurant,
  findRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
