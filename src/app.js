require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cartRouter = require("./router/cartRouter");
const productRouter = require("./router/productRouter");

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/products", productRouter);

async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected at ${conn.connection.host}`);

    app.listen(4000, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
