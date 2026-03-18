import ConnectDB from "@/lib/database/mongo";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await ConnectDB()
        const {id}= await req.json()

        if(!id){
            return NextResponse.json({ success: false, message: 'id not found'}, {status:400})
        }

        const order= await Order.findById(id)
        if(!order){
            return NextResponse.json({ succes:false, message:'Order not found'}, {status:400})
        }
        order.status='cancelled'
        order.paymentStatus='unpaid'

        await order.save()

        return NextResponse.json({ succes: true, message: 'Successfully cancelled order'}, {status:200})
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message:'Failed to cancell order',
            error: error.message
        }, {status:500})
        
    }
    
}