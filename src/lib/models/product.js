import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Product title is required'],
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        index: true // Faster querying by slug
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    imageId: {
        type: String, 
        required: [true, 'Image ID is required'],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required'],
    },
    isAvailable: {
        type: Boolean,
        default: true,
        index: true 
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;