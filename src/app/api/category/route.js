import ConnectDB from "@/lib/database/mongo";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
    try {
        await ConnectDB()
        const cat= await Category.find({})
        if(!cat || cat.length===0){
            return NextResponse.json({
                success:false, message:'No category found'
            },{status:400})
        }
        return NextResponse.json({
            success:true, message:'Successfully fetched data', payload:cat
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}

export async function POST(req) {
    try {
        await ConnectDB()
        const formData = await req.formData()
        const name= formData.get('name')

        const slug= slugify(name, {strict:true})
        const isExist= await Category.findOne({slug:slug})

        if(isExist){
            return NextResponse.json({
                success:false, message:'Category Already exist'
            },{status:400})
        }
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}