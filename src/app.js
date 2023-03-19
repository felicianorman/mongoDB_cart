require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

const cartRouter = require("./router/cartRouter");
const productRouter = require("./router/productRouter");

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/products", productRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

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
