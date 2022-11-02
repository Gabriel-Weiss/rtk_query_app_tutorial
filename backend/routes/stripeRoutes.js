const Express = require("express");
const router = Express.Router();
const cors = require("cors");
const {
  getPublishableKey,
  makePayment,
} = require("../controllers/stripeController");

router.get("/config", getPublishableKey).post("/payment", makePayment);

module.exports = router;
