const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");

const CategorySchema = new Schema({
    categoryName: {unique: true, required: true, type: String},
    image: {type: String, required: true},
    subcategories: [{type: Schema.Types.ObjectId, ref: 'Subcategory'}],
})
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;