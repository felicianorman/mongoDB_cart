const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    amount: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Product', productSchema)