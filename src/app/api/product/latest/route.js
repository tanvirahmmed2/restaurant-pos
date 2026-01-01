import ConnectDB from "@/lib/database/mongo";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB()

        const products=await Product.find({}).sort({createdAt:-1}).limit(-8)

        if(!products){
            return NextResponse.json({success: false, message: 'No product data found'}, {status:400})

        }

        return NextResponse.json({success:true, message:'Successfully fetched data', payload: products}, {status:200})
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch data', error: error.message}, {status:500})
        
    }
    
}