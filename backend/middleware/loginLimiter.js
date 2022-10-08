const ratelimiter = require("express-rate-limit");

const loginLimiter = ratelimiter.rateLimit({
  windowMs: 1000 * 60,
  max: 5,
  message: {
    message:
      "Something is wrong, too many requests are happening. Please try again later.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
