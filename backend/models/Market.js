const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_level: {
      type: Number,
      required: true,
    },
    avg_delivery_time: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Market", marketSchema);
