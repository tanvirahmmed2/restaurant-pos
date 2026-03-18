import { isStaff } from "@/lib/auth/staffmiddleware";
import ConnectDB from "@/lib/database/mongo";
import Expense from "@/lib/models/expense";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const auth= await isStaff()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }
        await ConnectDB()
        const expenses=await Expense.find({}).sort({createdAt:-1})
        return NextResponse.json({
            success:true, message:'Successfully fetched data', payload:expenses
        }, {status:200})
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}

export async function DELETE(req) {
    try {
        await ConnectDB()
        const auth= await isStaff()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }
        const {id}= await req.json()
        if(!id){
            return NextResponse.json({
                success:false, message:'Id not found'
            },{status:400})
        }
        const expense= await Expense.findById(id)
        if(!expense){
            return NextResponse.json({
                success:false, message:'Expense data not found'
            },{status:400})
        }

        await Expense.findByIdAndDelete(id)
        return NextResponse.json({
                success:true, message:'Successfully deleted record'
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
        const auth= await isStaff()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }
        const {title, note, amount}= await req.json()
        if(!title || !note || !amount){
            return NextResponse.json({
                success: false, message:'Please fill all data'
            },{status:400})
        }
        const staff= auth.payload
        const newRecord= new Expense({title, note, amount,madeBy:staff.email })
        await newRecord.save()
        return NextResponse.json({
            success:true, message:'Successfully created record'
        },{status:200})

    }catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
        
    }
    
}