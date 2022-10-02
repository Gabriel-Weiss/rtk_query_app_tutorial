const mongoose = require("mongoose");

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Float,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
