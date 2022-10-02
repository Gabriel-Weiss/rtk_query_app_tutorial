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

const updateRestaurant = async (restaurant, update) => {
  return await Restaurant.updateOne(restaurant, update).exec();
};

const deleteRestaurant = async (id) => {
  return await Restaurant.findByIdAndDelete(id).exec();
};

module.exports = {
  findAllRestaurants,
  createRestaurant,
  findRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
