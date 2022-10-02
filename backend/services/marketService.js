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

const updateMarket = async (market, update) => {
  return await Market.updateOne(market, update).exec();
};

const deleteMarket = async (id) => {
  return await Market.findByIdAndDelete(id).exec();
};

module.exports = {
  findAllMarkets,
  createMarket,
  findMarketById,
  updateMarket,
  deleteMarket,
};
