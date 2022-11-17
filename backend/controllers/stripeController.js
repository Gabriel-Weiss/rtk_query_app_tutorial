const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  let sum = 0;
  if (Number.isFinite(amount)) {
    sum = amount.toFixed(2) * 100;
  }
  return sum;
};

const getPublishableKey = asyncHandler(async (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

const makePayment = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      currency: "ron",
      amount: calculateOrderAmount(amount),
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: payment.client_secret });
  } catch (error) {
    console.log("Data not accepted by server!!!\n", error.message);
  }
});

module.exports = { getPublishableKey, makePayment };
