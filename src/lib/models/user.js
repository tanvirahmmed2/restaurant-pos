import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: [true, 'User with this email already exists']
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isBanned: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User