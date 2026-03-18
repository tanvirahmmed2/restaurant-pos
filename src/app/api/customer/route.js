import ConnectDB from "@/lib/database/mongo";
import Customer from "@/lib/models/customer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB()
        const customers= await Customer.find({})

        return NextResponse.json({
            success:true, message:'Successfully fetched data', payload:customers
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}