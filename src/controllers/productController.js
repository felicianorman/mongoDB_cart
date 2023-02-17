const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.send(products);
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  res.json(product);
};

exports.addProductsToCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.body.cartId;

  const products = await Product.findById(productId);
  const cart = await Cart.findById(cartId);

  cart.products.push(products);

  cart.totalAmount += products.price;

  await cart.save();
  console.log(cart);

//   return res.send(cart);

  return res.setHeader('Location', `http://localhost:4000/api/v1/products/${cart._id}`).status(201).json(cart)
};
