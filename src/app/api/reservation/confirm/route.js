import ConnectDB from "@/lib/database/mongo";
import Reservation from "@/lib/models/reservation";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await ConnectDB()

        const {id}= await req.json()
        if(!id){
            return NextResponse.json({
                success:false,
                message:'Id not found'
            }, {status:400})
        }
        const reservation= await Reservation.findById(id)
        if(!reservation){
            return NextResponse.json({
                success:false,
                message:'Reservation data not found'
            }, {status:400})
        }
        reservation.status='confirmed'
        await reservation.save()

        return NextResponse.json({
            success:true,
            message:'Successfully confirmed reservation'
        }, {status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Failed to confirm reservation',
            error: error.message
        }, {status:500})
        
    }
    
}