import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'Please choose another title']
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    imageId: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
        enum: {
            values: ['meals', 'snacks', 'drinks', 'combo', 'salad', 'dessert'],
            message: '{VALUE} is not supported'
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
        trim: true,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Product = mongoose.models.products || mongoose.model('products', productSchema)

export default Product