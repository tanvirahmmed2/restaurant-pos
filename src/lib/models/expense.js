import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    note: { type: String, trim: true, required: true },
    amount: { type: Number, trim: true, required: true },
    madeBy: { type: String, trim: true, required: true },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Expense= mongoose.models.Expense || mongoose.model('Expense', expenseSchema)

export default Expense