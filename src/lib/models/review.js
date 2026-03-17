import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    name:{
        type:String, required:true, trim:true
    },
    email:{
        type:String, required:true, trim:true, unique:true
    },
    comment:{
        type:String, required:true, trim:true
    },
    rating:{
        type:Number, required:true, trim:true
    }
})

const Review= mongoose.models.Review || mongoose.model('Review', reviewSchema)

export default Review