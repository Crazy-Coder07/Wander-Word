const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.green
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.blue);
  }
};

module.exports = connectDB;
