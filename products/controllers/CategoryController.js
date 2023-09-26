const express = require("express");
const router = express.Router();
const Category = require('../models/Category.js');


router.post('/addCategory', async (req, res) => {
    try {
        const {categoryName, image} = req.body; // Обновленные поля из объекта запроса

        // Проверка наличия обязательных полей
        if (!categoryName) {
            return res.status(400).json({error: 'Иди нахуй короче'});
        }
        if (!image) {
            return res.status(400).json({error: 'Ахуел без картинки'});
        }

        // Создание новой категории с использованием модели Category
        const newCategory = new Category({categoryName, image});
        await newCategory.save(); // Сохранение в базе данных

        res.status(201).json(newCategory); // Отправка успешного ответа с созданной категорией
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Произошла ошибка при добавлении категории'});
    }
});
router.get('/getAllSections', async (req, res) => {
    try {
        const categories = await Category.find()
            .populate({
                path: 'subcategories',
                populate: {
                    path: 'sections',
                    model: 'Section',
                    // populate: {
                    //     path: 'products',
                    //     model: 'Product'
                    // }
                }
            })
        res.json(categories)
    } catch (e) {
        console.log(e)
        res.status(200).json({error: `${e}`})
    }
})
router.get('/getCategoryList', async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('categoryName image');
        res.json(categories)
    } catch (e) {
        res.status(201).json({error: `${e}`})
    }
})

module.exports = router;