const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const {
  findAllProducts,
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

//  @description Get all products
//  @route GET /products
//  @access Public
const getProductsHandler = asyncHandler(async (req, res) => {
  const products = await findAllProducts();
  if (!products?.length) {
    return res.status(400).json({ message: "No products found." });
  }
  return res.json(products);
});

//  @description Get all products
//  @route GET /products
//  @access Public
const getProductHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const product = await findProductById(id);

  if (!product) {
    return res.status(400).json({ message: "Product not found." });
  }

  return res.json(product);
});

//  @description Create a new Product
//  @route POST /products
//  @access Private
const createProductHandler = asyncHandler(async (req, res) => {
  const { name, price, marketId, description, category } = req.body;

  if (!name || !price || !marketId || !category) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const productObject = { name, price, marketId, description, category };

  const created = await createProduct(productObject);

  if (created) {
    res.status(201).json({
      message: `Product ${productObject.name} created successfully`,
    });
  } else {
    res.status(400).json({
      message: `Product ${productObject.name} could not be created`,
    });
  }
});

//  @description Update a Product
//  @route PATCH /products
//  @access Private
const updateProductHandler = asyncHandler(async (req, res) => {
  const { name, price, marketId, description, category } = req.body;
  const id = req.params.id;

  if (!name || !price || !marketId || !category) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const product = await findProductById(id);

  if (!product) {
    return res.status(400).json({ message: "Product not found." });
  }

  //const duplicate = await findProductByName(name);

  product.name = name;
  product.price = price;
  product.marketId = marketId;
  product.description = description;
  product.category = category;

  const updatedProduct = await updateProduct(id, product);

  res.json({
    message: `Product ${updatedProduct.name} updated successfully`,
  });
});

//  @description Delete a Product
//  @route DELETE /products
//  @access Private
const deleteProductHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const product = await findProductById(id);

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  const deletedProduct = await deleteProduct(product);

  res.json({
    message: `Product ${deletedProduct.name} deleted successfully`,
  });
});

module.exports = {
  getProductsHandler,
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
