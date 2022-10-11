const Product = require("../models/Product");

const findAllProducts = async () => {
  return await Product.find().select("-createdAt -updatedAt").lean();
};

const createProduct = async (product) => {
  return await Product.create(product);
};

const findProductById = async (id) => {
  return await Product.findById(id).exec();
};

const findProductsByMarketId = async (marketId) => {
  return await Product.find({ marketId }).lean().exec();
};

const updateProduct = async (id, product) => {
  return await Product.findByIdAndUpdate(id, product).exec();
};

const deleteProduct = async (product) => {
  return await product.deleteOne();
};

module.exports = {
  findAllProducts,
  createProduct,
  findProductById,
  findProductsByMarketId,
  updateProduct,
  deleteProduct,
};
