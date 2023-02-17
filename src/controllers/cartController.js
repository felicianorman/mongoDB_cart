const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  const totalAmount = req.body.totalAmount;

  const newCart = await Cart.create({
    totalAmount: totalAmount,
  });

  return res.setHeader('Location', `http://localhost:4000/api/v1/carts/${newCart._id}`).status(201).json(newCart)
};

exports.getCartById = async (req, res) => {
    const cartId = req.params.cartId;

    const carts = await Cart.findById(cartId)

    res.json(carts)
}


exports.deleteCart = async (req, res) => {
    const cartId = req.params.cartId;

    const cartToDelete = await Cart.findById(cartId)

    if(!cartToDelete) return res.sendStatus(404)

    const response = await cartToDelete.delete()
    console.log(response)

    return res.sendStatus(204)
}

