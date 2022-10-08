const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const {
  getMarketsHandler,
  getMarketHandler,
  createMarketHandler,
  updateMarketHandler,
  deleteMarketHandler,
} = require("../controllers/marketController");

router
  .get("/", getMarketsHandler)
  .get("/:id", getMarketHandler)
  .post("/", verifyJWT, createMarketHandler)
  .patch("/:id", verifyJWT, updateMarketHandler)
  .delete("/:id", verifyJWT, deleteMarketHandler);

module.exports = router;
