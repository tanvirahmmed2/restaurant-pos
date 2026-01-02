import ConnectDB from "@/lib/database/mongo";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()
        const orders = await Order.find({status:'confirmed'}).sort({ createdAt: -1 })
        if (!orders) {
            return NextResponse.json({
                success: false,
                message: 'No running order found'
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully fetched orders',
            payload: orders
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch running orders',
            error: error.message
        }, { status: 500 })

    }

}
