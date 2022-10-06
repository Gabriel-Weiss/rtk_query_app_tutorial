const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    allowedOrigins.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error("Not allowed to access"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
