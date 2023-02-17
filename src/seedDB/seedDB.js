require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { mockData } = require("./products");

const populateDb = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    const products = await Product.create(mockData);

    console.log("Database populated with mock data");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
};

populateDb(process.env.MONGODB)