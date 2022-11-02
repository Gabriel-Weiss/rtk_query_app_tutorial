const mongoose = require("mongoose");
const Cart = require("./Cart");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["Visitor"],
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post("remove", async function (res, next) {
  await Cart.remove({ user: this._id });
  next();
});

module.exports = mongoose.model("User", userSchema);
