const Cart = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/error");

exports.createCart = async (req, res) => {
  try {
    const totalAmount = req.body.totalAmount;

    const newCart = await Cart.create({
      totalAmount: totalAmount,
    });

    if (!newCart) throw new BadRequestError("Could not create cart");

    return res
      .setHeader(
        "Location",
        `http://localhost:4000/api/v1/carts/${newCart._id}`
      )
      .status(201)
      .json(newCart);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const carts = await Cart.findById(cartId);
    if (!carts) throw new NotFoundError('That cart does not exist')

    return res.json(carts);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cartToDelete = await Cart.findById(cartId);

    if (!cartToDelete) throw new NotFoundError("That cart does not exist");

    const response = await cartToDelete.delete();
    console.log(response);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(error.statusCode || 500).json(error.message);
  }
};
