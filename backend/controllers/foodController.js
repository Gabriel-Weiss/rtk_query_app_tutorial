const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  findAllFoods,
  createFood,
  findFoodById,
  updateFood,
  deleteFood,
} = require("../services/foodService");

//  @description Get all foods
//  @route GET /foods
//  @access Public
const getFoodsHandler = asyncHandler(async (req, res) => {
  const foods = await findAllFoods();
  if (!foods?.length) {
    return res.status(400).json({ message: "No foods found." });
  }
  return res.json(foods);
});

//  @description Get all foods
//  @route GET /foods
//  @access Public
const getFoodHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const food = await findFoodById(id);

  if (!food) {
    return res.status(400).json({ message: "Food not found." });
  }

  return res.json(food);
});

//  @description Create a new food
//  @route POST /foods
//  @access Private
const createFoodHandler = asyncHandler(async (req, res) => {
  const { name, price, restaurantId, quantity, category } = req.body;

  if (!price || !restaurantId || !name || !category) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const foodObject = { name, price, restaurantId, quantity, category };

  const created = await createFood(foodObject);

  if (created) {
    res.status(201).json({
      message: `food ${foodObject.name} created successfully`,
    });
  } else {
    res.status(400).json({
      message: `food ${foodObject.name} could not be created`,
    });
  }
});

//  @description Update a food
//  @route PATCH /foods
//  @access Private
const updateFoodHandler = asyncHandler(async (req, res) => {
  const { name, price, restaurantId, quantity, category } = req.body;
  const id = req.params.id;

  if (!price || !restaurantId || !name || !category) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const food = await findFoodById(id);

  if (!food) {
    return res.status(400).json({ message: "Food not found." });
  }

  food.name = name;
  food.price = price;
  food.restaurantId = restaurantId;
  food.quantity = quantity;
  food.category = category;

  const updatedfood = await updateFood(id, food);

  res.json({
    message: `food ${updatedfood.name} updated successfully`,
  });
});

//  @description Delete a food
//  @route DELETE /foods
//  @access Private
const deleteFoodHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const food = await findFoodById(id);

  if (!food) {
    return res.status(400).json({ message: "Food not found" });
  }

  const deletedfood = await deleteFood(food);

  res.json({
    message: `food ${deletedfood.name} deleted successfully`,
  });
});

module.exports = {
  getFoodsHandler,
  getFoodHandler,
  createFoodHandler,
  updateFoodHandler,
  deleteFoodHandler,
};
