const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use("/auth", require("./routes/authRoutes"));
  app.use("/users", require("./routes/userRoutes"));
  app.use("/markets", require("./routes/marketRoutes"));
  app.use("/products", require("./routes/productRoutes"));
  app.use("/restaurants", require("./routes/restaurantRoutes"));
  app.use("/foods", require("./routes/foodRoutes"));

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
