const { Schema, model } = require('mongoose')
const mongoose = require("mongoose");

const SectionSchema = new Schema({
    sectionName: { unique: true, required: true, type: String },
    subcategory: Schema.Types.ObjectId,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})
const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;