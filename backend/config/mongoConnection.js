const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connDb = await mongoose.connect(process.env.DATABASE_URI);
    console.log(`MongoDB connection: ${connDb.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
