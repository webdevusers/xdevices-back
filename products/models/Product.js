const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");

const ProductSchema = new Schema({
    productName: { unique: true, required: true, type: String },
    desc: {type: String},
    stockQuantity: {type: Number},
    price: {type: Number},
    filters: {type: Array}, 
    images: {type: Array},
    characteristics: {type: Array},
    section: Schema.Types.ObjectId
})
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
