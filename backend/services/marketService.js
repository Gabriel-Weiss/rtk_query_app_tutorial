const Market = require("../models/Market");

const findAllMarkets = async () => {
  return await Market.find().lean();
};

const createMarket = async (market) => {
  return await Market.create(market);
};

const findMarketById = async (id) => {
  return await Market.findById(id).exec();
};

const updateMarket = async (id, market) => {
  return await Market.findByIdAndUpdate(id, market).exec();
};

const deleteMarket = async (market) => {
  return await market.deleteOne();
};

module.exports = {
  findAllMarkets,
  createMarket,
  findMarketById,
  updateMarket,
  deleteMarket,
};
