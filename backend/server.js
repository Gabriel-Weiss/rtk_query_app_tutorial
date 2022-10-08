require("dotenv").config();
const mongoose = require("mongoose");
const connectDatabase = require("./config/mongoConnection");
const createApp = require("./setupServer");
const PORT = process.env.PORT || 3500;

connectDatabase();
const app = createApp();

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
