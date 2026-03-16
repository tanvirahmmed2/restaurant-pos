import mongoose from "mongoose";

const staffSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'Staff with this email already exists']
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        trim: true,
        required: true,
        enum: {
            values: ['admin', 'manager', 'sales'],
            message: '{VALUE} is not supporetd'
        }
    },
    isBanned: {
        type: Boolean,
        default: false
    }
})

const Staff = mongoose.models.staffs || mongoose.model('staffs', staffSchema)

export default Staff