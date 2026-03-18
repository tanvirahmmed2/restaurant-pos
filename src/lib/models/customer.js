import mongoose from "mongoose";

const customerSchema= new mongoose.Schema({
    name:{
        type:String, trim:true, default:'guest'
    },
    phone:{
        type:String, trim:true, default:'01900000000'
    }
    
})

const Customer= mongoose.models.Customer || mongoose.model('Customer', customerSchema)

export default Customer