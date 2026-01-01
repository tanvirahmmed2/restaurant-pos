import ConnectDB from "@/lib/database/mongo";
import Support from "@/lib/models/support";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectDB()

        const supports = await Support.find({}).sort({ createdAt: -1 })
        if (!supports) {
            return NextResponse.json({ success: false, message: "Support data not found" }, { status: 400 })
        }
        return NextResponse.json({ success: true, message: 'Successfully fetched support data', payload: supports }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: ' Failed to fetch support data', error: error.message }, { status: 500 })

    }

}

export async function DELETE(req) {
    try {

        await ConnectDB()

        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({ success: false, message: 'Id not found' }, { status: 400 })
        }
        const support = await Support.findById(id)
        if (!support) {
            return NextResponse.json({
                success: false, message: 'Support data not found'
            }, { status: 400 })
        }

        await Support.findByIdAndDelete(id)

        return NextResponse.json({
            success: true, message: 'Successfully deleted support data'
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: ' Failed to delete support data', error: error.message }, { status: 500 })

    }

}

export async function POST(req) {
    try {
        await ConnectDB()
        const {name, email, subject, message}= await req.json()
        if(!name || !email || !subject || !message){
            return NextResponse.json({
                 success: false, message:"Please fill all information"
            },{status:400})
        }

        const newSupport= new Support({name, email, subject, message})

        await newSupport.save()

        return NextResponse.json({
            success: true, message:'Placed support message. Wait for response'
        },{status:200})
    } catch (error) {
        return NextResponse.json({success:false, message:'Failed to create support message', error:error.message}, {status:500})
    }
    
}