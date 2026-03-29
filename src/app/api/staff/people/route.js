import { isAdmin } from "@/lib/auth/staffmiddleware";
import ConnectDB from "@/lib/database/mongo";
import Staff from "@/lib/models/staff";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()
        const auth= await isAdmin()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }
        const Staffs= await Staff.find({})
        return NextResponse.json({
            success:false, message:'Successfully fetched data', payload:Staffs
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
    }
    
}