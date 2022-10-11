const Food = require("../models/Food");

const findAllFoods = async () => {
  return await Food.find().select("-createdAt -updatedAt").lean();
};

const createFood = async (food) => {
  return await Food.create(food);
};

const findFoodById = async (id) => {
  return await Food.findById(id).exec();
};

const findFoodByRestaurantId = async (restaurantId) => {
  const query = Food.where({ restaurantId });
  return await query.findOne().lean().exec();
};

const updateFood = async (id, food) => {
  return await Food.findByIdAndUpdate(id, food).exec();
};

const deleteFood = async (food) => {
  return await food.deleteOne();
};

module.exports = {
  findAllFoods,
  createFood,
  findFoodById,
  findFoodByRestaurantId,
  updateFood,
  deleteFood,
};
