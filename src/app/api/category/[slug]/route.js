import ConnectDB from "@/lib/database/mongo";
import Category from "@/lib/models/category";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    try {
        await ConnectDB()
        const {slug}= await params
        if(!slug) return NextResponse.json({
            success:false, message:'Slug not found'
        })
        const category= await Category.findOne({ 
            slug: { $regex: new RegExp(`^${slug}$`, "i") } 
        }) 
        
        if(!category){
            return NextResponse.json({
                success:false, message:'Category not found'
            },{status:400})
        }
        const products= await Product.find({categoryId: category._id}).populate('categoryId', 'name slug')
            .sort({ createdAt: -1 })
            .lean();

            return NextResponse.json({
                success:true, message:'Successfully fetched data', payload:products
            },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}