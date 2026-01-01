import ConnectDB from "@/lib/database/mongo";
import Reservation from "@/lib/models/reservation";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()
        const reservations = await Reservation.find({}).sort({ createAt: -1 })

        if (!reservations) {
            return NextResponse.json({ success: false, message: "Reservation data not found" }, { status: 400 })
        }

        return NextResponse.json({ success: true, message: 'Successfully fetched reservation data', payload: reservations }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch reservation data', error: error.message }, { status: 500 })

    }

}

export async function DELETE(req) {
    try {

        await ConnectDB()

        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({ success: false, message: 'Id not found' }, { status: 400 })
        }
        const reservation = await Reservation.findById(id)
        if (!reservation) {
            return NextResponse.json({
                success: false, message: 'reservation data not found'
            }, { status: 400 })
        }

        await Reservation.findByIdAndDelete(id)

        return NextResponse.json({
            success: true, message: 'Successfully deleted reservation data'
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: ' Failed to delete reservation data', error: error.message }, { status: 500 })

    }

}

export async function POST(req) {
    try {
        await ConnectDB()
        const {name, email, date, table, member, message}= await req.json()
        if(!name || !email || !date || !member || !table){
            return NextResponse.json({
                 success: false, message:"Please fill all information"
            },{status:400})
        }

        const newReservation= new Reservation({name, email, date, member, table, message})

        await newReservation.save()

        return NextResponse.json({
            success: true, message:'Placed reservation. Wait for confirmation'
        },{status:200})
    } catch (error) {
        return NextResponse.json({success:false, message:'Failed to create reservation', error:error.message}, {status:500})
    }
    
}