const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");

const SubcategorySchema = new Schema({
    subcategoryName: { unique: true, required: true, type: String },
    category: Schema.Types.ObjectId,
    sections: [{type: Schema.Types.ObjectId, ref: 'Sections'}]
})
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;