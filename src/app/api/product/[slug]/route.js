import ConnectDB from "@/lib/database/mongo";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch data',
            error: error.message
        }, { status: 500 })
    }

}