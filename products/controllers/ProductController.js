const ProductModel = require('../models/Product.js');
const SectionModel = require('../models/Section.js');
const express = require('express');
const router = express.Router();

router.post('/addProduct', async (req, res) => {
    try {
        const { array, sectionID } = req.body;
        const products = await ProductModel.insertMany(array);

        const section = await SectionModel.findById(sectionID);
        if (!section) {
            return res.status(404).json({ status: 'Section does not exist' });
        }

        products.forEach(product => {
            section.products.push(product._id);
        });

        await section.save();

        res.status(201).json({ status: 'Products added successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: `${e}` });
    }
});

router.get('/getProductsBySection/:sectionID', async (req, res) => {
    try {
        const { sectionID } = req.params;
        const page = parseInt(req.query.page) || 1; // Текущая страница (по умолчанию 1)
        const pageSize = 30; // Количество товаров на странице

        const section = await SectionModel.findById(sectionID).populate('products');
        if (!section) {
            return res.status(404).json({ status: 'Section does not exist' });
        }

        const filteredProducts = section.products
            .sort((a, b) => b.stockQuantity - a.stockQuantity);

        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;

        const pageOfProducts = filteredProducts.slice(startIndex, endIndex);

        res.status(200).json(pageOfProducts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: `${e}` });
    }
});
router.get('/getFiltersBySection/:sectionID', async (req, res) => {
    try {
        const { sectionID } = req.params;

        const section = await SectionModel.findById(sectionID).populate('products');
        if (!section) {
            return res.status(404).json({ status: 'Section does not exist' });
        }

        const filters = []; // Здесь вы можете создать логику для получения фильтров из товаров в разделе section

        res.status(200).json({ filters });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: `${e}` });
    }
});

module.exports = router;
