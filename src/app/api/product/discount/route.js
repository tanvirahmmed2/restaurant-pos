import Product from "@/lib/models/product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await Product.find({ discount: { $gt: 0 } })
            .populate('categoryId', 'name slug')
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json({
            success: true, message: 'Successfully fethced data', payload: products
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}