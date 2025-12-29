import ConnectDB from "@/lib/database/mongo";
import { isLogin } from "@/lib/middleware";
import Order from "@/lib/models/order";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()
        const orders = await Order.find({}).sort({ createdAt: -1 })
        if (!orders || orders.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No order found'
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
            message: 'Failed to fetch orders',
            error: error.message
        }, { status: 500 })

    }

}

export async function POST(req) {
    try {
        await ConnectDB()

        const { name, phone, delivery, items, tabel, subTotal, tax, discount, totalPrice, paymentMethod } = await req.json()
        if (!delivery || !subTotal || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Missing order details' }, { status: 400 });
        }

        const newOrder = new Order({ name, phone, delivery, items, tabel, subTotal, tax, discount, totalPrice, paymentMethod})

        await newOrder.save()

        return NextResponse.json({
            success: true,
            message: 'Successfully placed order',
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to create order',
            error: error.message
        }, { status: 500 })

    }

}

export async function DELETE(req) {
    try {
        await ConnectDB()
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({
                success: false,
                message: 'Id not found'
            }, { status: 400 })
        }

        const order = await Order.findById(id)

        if (!order) {
            return NextResponse.json({
                success: false,
                message: 'Order not found',
            }, { status: 400 })
        }

        await Order.findByIdAndDelete(id)

        return NextResponse.json({ success: true, message: 'Successfully deleted order' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to delete order',
            error: error.message
        }, { status: 500 })

    }

}