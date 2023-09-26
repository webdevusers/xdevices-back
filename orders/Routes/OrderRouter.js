const express = require('express');
const router = express.Router();
const Order = require('../Order');

// Создание нового заказа
router.post('/create', async (req, res) => {
    try {
        const {
            userId,
            fullName,
            email,
            phone,
            orderStatus,
            orderDetails,
            ttn,
            deliveryAddress,
            productIds,
        } = req.body;
        const order = new Order({
            userId,
            fullName,
            email,
            phone,
            orderStatus,
            orderDetails,
            ttn,
            deliveryAddress,
            productIds,
        });

        await order.save();
        res.status(201).json({ message: 'Заказ успешно создан', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при создании заказа' });
    }
});

// Получение всех заказов
router.get('/getAllOrders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при получении заказов' });
    }
});

// Получение заказа по ID
router.get('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при получении заказа' });
    }
});

// Изменение статуса заказа по ID
router.patch('/newStatus/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { newStatus } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus: newStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        res.status(200).json({ message: 'Статус заказа успешно изменен', order: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при изменении статуса заказа' });
    }
});

// Удаление заказа по ID
router.delete('/del/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await Order.findByIdAndRemove(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Заказ не найден' });
        }

        res.status(200).json({ message: 'Заказ успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Произошла ошибка при удалении заказа' });
    }
});

module.exports = router;
