import mongoose from "mongoose";

const catSchema= new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    slug:{type:String, required:true, trim:true},
    image:{type:String, required:true, trim:true},
    imageId:{type:String, required:true, trim:true},
})

const Category= mongoose.models.categories || mongoose.model('categories', catSchema)

export default Category