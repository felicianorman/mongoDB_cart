const { default: mongoose, mongo } = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productName: {type: mongoose.Schema.Types.String},
      price: {type: mongoose.Schema.Types.Number},
      amount: {type: mongoose.Schema.Types.Number}
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
