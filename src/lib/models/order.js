import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default:'guest',
    },
    phone: {
        type: String,
        trim:true,
        default:'01900000000'
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            title: String,
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            discount: { type: Number, required: true },
        }
    ],

    deliveryMethod: {
        type: String,
        enum: ['takeaway', 'takein'],
        default:'takein'
    },
    table: {
        type: String,
        trim: true,
        default:'N/A'
    },

    subTotal: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    paymentMethod: {
        type: String,
        enum: ['bkash', 'card', 'nagad, rocket', 'cash'],
        default: 'cash'
    },

    status: {
        type: String,
        enum: ['confirmed', 'delivered', 'cancelled','pending'],
        default: 'pending'
    },
    transactionId: {
        type: String,
        trim: true,
        default: ''
    },
    paymentStatus: {
        type: String,
        enum: ['paid','unpaid'],
        default: 'unpaid'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.models.orders || mongoose.model('orders', orderSchema);

export default Order;