const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  findAllMarkets,
  createMarket,
  findMarketById,
  updateMarket,
  deleteMarket,
} = require("../services/marketService");

//  @description Get all markets
//  @route GET /markets
//  @access Public
const getMarketsHandler = asyncHandler(async (req, res) => {
  const markets = await findAllMarkets();
  if (!markets?.length) {
    return res.status(400).json({ message: "No markets found." });
  }
  return res.json(markets);
});

//  @description Get market
//  @route GET /markets/:id
//  @access Public
const getMarketHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const market = await findMarketById(id);

  if (!market) {
    return res.status(400).json({ message: "Market not found" });
  }

  return res.json(market);
});

//  @description Create a new market
//  @route POST /markets
//  @access Private
const createMarketHandler = asyncHandler(async (req, res) => {
  const { name, price_level, avg_delivery_time } = req.body;

  if (!price_level || !avg_delivery_time || !name) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  //const duplicate = await findMarketByName(name);

  const marketObject = { name, price_level, avg_delivery_time };

  const created = await createMarket(marketObject);

  if (created) {
    res
      .status(201)
      .json({ message: `Market ${marketObject.name} created successfully` });
  } else {
    res
      .status(400)
      .json({ message: `Market ${marketObject.name} could not be created` });
  }
});

//  @description Update a market
//  @route PATCH /markets
//  @access Private
const updateMarketHandler = asyncHandler(async (req, res) => {
  const { name, price_level, avg_delivery_time } = req.body;
  const id = req.params.id;

  if (!name || !price_level || !avg_delivery_time) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const market = await findMarketById(id);

  if (!market) {
    return res.status(400).json({ message: "Market not found." });
  }

  //const duplicate = await findMarketByName(name);

  market.name = name;
  market.price_level = price_level;
  market.avg_delivery_time = avg_delivery_time;

  const updatedMarket = await updateMarket(id, market);

  res.json({ message: `Market ${updatedMarket.name} updated successfully` });
});

//  @description Delete a market
//  @route DELETE /markets
//  @access Private
const deleteMarketHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const market = await findMarketById(id);

  if (!market) {
    return res.status(400).json({ message: "Market not found" });
  }

  const deletedMarket = await deleteMarket(market);

  res.json({ message: `Market ${deletedMarket.name} deleted successfully` });
});

module.exports = {
  getMarketsHandler,
  getMarketHandler,
  createMarketHandler,
  updateMarketHandler,
  deleteMarketHandler,
};
