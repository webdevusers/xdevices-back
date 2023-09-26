const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5175; // Вы можете выбрать порт, который вам удобен
app.use(cors())

mongoose.connect('mongodb+srv://xdevices-admin:oRZOsdo704u77Ikv@xdevices.u0oxqno.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(bodyParser.json());

const authRoutes = require('./users/Routes/AuthRouter');
const orderRoutes = require('./orders/Routes/OrderRouter');
const categoryRoutes = require('./products/controllers/CategoryController')
const subcategoryRoutes = require('./products/controllers/SubcategoryController')
const sectionRoutes = require('./products/controllers/SectionController')
const productRoutes = require('./products/controllers/ProductController')

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes)
app.use('/subcategories', subcategoryRoutes)
app.use('/sections', sectionRoutes)
app.use('/products', productRoutes)

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});