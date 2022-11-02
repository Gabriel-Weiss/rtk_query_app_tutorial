const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "itemModel",
  },
  itemQty: {
    type: Number,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemTotal: {
    type: Number,
    required: true,
  },
  itemModel: {
    type: String,
    required: true,
    enum: ["Food", "Product"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: {
      type: [itemSchema],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
