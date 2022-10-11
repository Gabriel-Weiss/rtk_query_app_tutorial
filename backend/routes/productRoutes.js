const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getProductsHandler,
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../controllers/productController");

router
  .get("/", getProductsHandler)
  .get("/:id", getProductHandler)
  .post("/", verifyJWT, createProductHandler)
  .patch("/:id", verifyJWT, updateProductHandler)
  .delete("/:id", verifyJWT, deleteProductHandler);

module.exports = router;
