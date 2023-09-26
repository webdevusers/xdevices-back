const SubcategoryModel = require('../models/Subcategory.js');
const CategoryModel = require('../models/Category.js');
const express = require('express');
const router = express.Router();


router.post('/addSubcategory', async (req, res) => {
    try {
        const {categoryID, subcategoryName} = req.body;

        if (!categoryID) {
            return res.status(400).json({status: "Category ID exists"});
        }

        if (!subcategoryName) {
            return res.status(400).json({status: "Subcategory Name exists"});
        }

        const subcategory = new SubcategoryModel({
            subcategoryName: subcategoryName,
            category: categoryID
        });
        await subcategory.save();

        const category = await CategoryModel.findById(categoryID);

        if (!category) {
            return res.status(404).json({status: "Category exists"});
        }

        category.subcategories.push(subcategory._id);
        await category.save();

        res.status(201).json({status: "Subcategory added successfully"});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: `${e}`});
    }
})
router.delete('/delSubcategory/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const category = await SubcategoryModel.findOneAndRemove({id});
        if (!category) {
            res.status(404).send({status: "404"})
        }
    } catch (e) {
        res.status(400).send({server: '400'})
    }
})

module.exports = router;
