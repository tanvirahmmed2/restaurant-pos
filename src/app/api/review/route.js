import ConnectDB from "@/lib/database/mongo";
import Review from "@/lib/models/review";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB()
        const reviews= await Review.find({})
        return NextResponse.json({
            success:true, message:'Successfully fetched data', payload:reviews
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}

export async function DELETE(req) {
    try {
        await ConnectDB()
        const {id}= await req.json()
        if(!id){
            return NextResponse.json({
                success:false, message:'Id not found'
            },{status:400})
        }
        const review= await Review.findById(id)
        if(!review){
            return NextResponse.json({
                success:false, message:'Review not found'
            },{status:400})
        }
        await Review.findByIdAndDelete(id)
        return NextResponse.json({
            success:true, message:'Successfully deleted review'
        },{status:200})
    }catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
    
}


export async function POST(req) {
    try {
        await ConnectDB()
        const {name, email, comment, rating}= await req.json()
        if(!name || !email || !comment ||!rating){
            return NextResponse.json({
                success:false, message:'Please provide all information'
            },{status:400})
        }
        const isExist= await Review.findOne({email})
        if(isExist){
            return NextResponse.json({
                success:false, message:'Review already submitted with this email'
            },{status:400})
        }
        const newReview= new Review({
            name, email, comment,rating
        })
        await newReview.save()

        return NextResponse.json({
            success:true, message:'Successfully submitted review'
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
    
}