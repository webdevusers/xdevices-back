const SectionModel = require('../models/Section.js');
const SubcategoryModel = require('../models/Subcategory.js');
const express = require('express');
const router = express.Router();

router.post('/addSection', async (req, res) => {
    try {
        const { sectionName, subcategoryID } = req.body;

        if (!subcategoryID) {
            return res.status(400).json({ status: "Subcategory ID does not exist" });
        }

        if (!sectionName) {
            return res.status(400).json({ status: "Section Name does not exist" });
        }

        const section = new SectionModel({
            sectionName,
            subcategory: subcategoryID
        });
        await section.save();

        const subcategory = await SubcategoryModel.findById(subcategoryID);

        if (!subcategory) {
            return res.status(404).json({ status: "Subcategory does not exist" });
        }

        subcategory.sections.push(section._id);
        await subcategory.save();

        res.status(201).json({ status: "Section added successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: `${e}` });
    }
});

router.get('/getSectionsBySubcategory/:subcategoryID', async (req, res) => {
    try {
        const { subcategoryID } = req.params;
        const sections = await SectionModel.find({ subcategory: subcategoryID });
        res.status(200).json(sections);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: `${e}` });
    }
});

module.exports = router;
