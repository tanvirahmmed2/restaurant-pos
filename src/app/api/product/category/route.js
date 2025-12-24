import { NextResponse } from "next/server";


export async function GET(req) {
    try {

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch data',
            error: error.message
        }, { status: 500 })
    }

}