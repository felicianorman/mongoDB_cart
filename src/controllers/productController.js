const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require('../utils/error')

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) throw new NotFoundError("Could not find products");
    return res.send(products);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("Could not find product");

    res.json(product);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.addProductsToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cartId = req.body.cartId;

    const products = await Product.findById(productId);
    const cart = await Cart.findById(cartId);

    if (!products || !cart)
      throw new BadRequestError("You must provde productId and cartId");

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
      .setHeader(
        "Location",
        `http://localhost:4000/api/v1/products/${cart._id}`
      )
      .status(201)
      .json(cart);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const cartId = req.body.cartId;

    const cart = await Cart.findById(cartId);

    if (!cart) return new BadRequestError("You must provde cartId");

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
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};
