const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();

  if (!products) return new Error("Could not find products");
  return res.send(products);
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) return new Error("Could not find product");

  res.json(product);
};

exports.addProductsToCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.body.cartId;

  const products = await Product.findById(productId);
  const cart = await Cart.findById(cartId);

  if (!products || !cart)
    return new Error("You must provde productId and cartId");

  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].id === productId) {
      cart.products[i].amount++;
      cart.totalAmount += cart.products[i].price;

      await cart.save();
      return res.json(cart);
    }
  }

  cart.products.push(products);

  cart.totalAmount += products.price;

  await cart.save();
  console.log(cart);

  return res
    .setHeader("Location", `http://localhost:4000/api/v1/products/${cart._id}`)
    .status(201)
    .json(cart);
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.body.cartId;

  const cart = await Cart.findById(cartId);

  if(!cart) return new Error('You must provde cartId')

  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].id === productId) {
      cart.products[i].amount--;
      await cart.save();

      if (cart.products[i].amount == 0) {
        cart.products.splice([i], 1);
        await cart.save();
      }
    }
  }

  cart.totalAmount = 0;
  for (let i = 0; i < cart.products.length; i++) {
    cart.totalAmount += cart.products[i].price * cart.products[i].amount;
  }

  await cart.save();

  return res.send(cart);
};
