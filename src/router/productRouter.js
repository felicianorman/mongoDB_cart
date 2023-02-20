const express = require('express')
const router = express.Router()
const { getAllProducts, getProductById, addProductsToCart, deleteProduct } = require('../controllers/productController')

router.get('/', getAllProducts)
router.get('/:productId', getProductById)
router.post('/:productId', addProductsToCart)
router.put('/:productId', deleteProduct)

module.exports = router;