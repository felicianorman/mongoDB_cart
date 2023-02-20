const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
  const totalAmount = req.body.totalAmount;


  const newCart = await Cart.create({
    totalAmount: totalAmount,
  });

  if(!newCart) return new Error('Could not create cart')

  return res.setHeader('Location', `http://localhost:4000/api/v1/carts/${newCart._id}`).status(201).json(newCart)
};

exports.getCartById = async (req, res) => {
    const cartId = req.params.cartId;

    const carts = await Cart.findById(cartId)
    if(!carts) return new Error('That cart does not exist')

    return res.json(carts)
}


exports.deleteCart = async (req, res) => {
    const cartId = req.params.cartId;

    const cartToDelete = await Cart.findById(cartId)

    if(!cartToDelete) return res.sendStatus(404)

    const response = await cartToDelete.delete()
    console.log(response)

    return res.sendStatus(204)
}

