import ConnectDB from "@/lib/database/mongo";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()

        const products = await Product.find({}).sort({ createdAt: -1 }).lean()

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No product data found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Product data fetched successfully',
            payload: products
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch data',
            error: error.message
        }, { status: 500 })

    }

}