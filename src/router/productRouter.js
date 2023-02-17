const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, addProductsToCart } = require('../controllers/productController')

router.get('/', getAllProducts)
router.get('/:productId', getProductById)
router.post('/:productId', addProductsToCart)

module.exports = router;