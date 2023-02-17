const express = require("express");
const router = express.Router();
const { createCart, getCartById, deleteCart, addProductsToCart } = require('../controllers/cartController');

router.post('/', createCart)
router.get('/:cartId', getCartById)
router.delete('/:cartId', deleteCart)


module.exports = router