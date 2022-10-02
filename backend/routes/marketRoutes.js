const express = require("express");
const router = express.Router();
const {
  getMarketsHandler,
  createMarketHandler,
  updateMarketHandler,
  deleteMarketHandler,
} = require("../controllers/marketController");

router
  .route("/")
  .get(getMarketsHandler)
  .post(createMarketHandler)
  .patch(updateMarketHandler)
  .delete(deleteMarketHandler);

module.exports = router;
