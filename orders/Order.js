const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    orderDetails: {
        type: String,
        required: true,
    },
    ttn: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    productIds: [
        {
            type: Array,
        },
    ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
