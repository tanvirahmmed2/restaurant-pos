import ConnectDB from "@/lib/database/mongo";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/lib/models/user";
import { cookies } from "next/headers";


export async function POST(req) {
    try {
        await ConnectDB()

        const { name, email, password ,phone} = await req.json()
        if (!name || !email || !password || !phone) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all information'
            }, { status: 400 })
        }
        if(phone.length!==11){
            return NextResponse.json({
                success:false, message:"Please enter a valid phone number"
            },{status:400})
        }
        const findUser= await User.findOne({$or:[{email},{phone}]})
        if(findUser){
            return NextResponse.json({
                success:false, message:" User already exist with this email"
            },{status: 400})
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await User({ name, email, password: hashedPass, phone })

        await newUser.save()

        return NextResponse.json({
            success: true,
            message: 'Successfully created user',
            payload: newUser
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        }, { status: 500 })
    }

}


export async function DELETE(req) {
    try {
        await ConnectDB()

        const { email } = await req.json()
        if (!email) {
            return NextResponse.json({
                success: false,
                message: "User id not found"
            }, { status: 400 })
        }

        
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 400 })
        }


        await User.findByIdAndDelete(user._id)

        return NextResponse.json({
            success: true,
            message: 'Account has been deleted'
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        }, { status: 500 })

    }

}

export async function GET() {
    try {
        await ConnectDB()
        const token = (await cookies()).get('user_token')?.value
        if (!token) {
            return NextResponse.json({ success: false, message: 'Please login' }, { status: 400 })
        }
        const decoded =  jwt.verify(token, JWT_SECRET)
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Failed jwt verification' }, { status: 400 })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 })
        }
        return NextResponse.json({ success: true, message: 'Successfully verified user', payload: user }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to authenticate user', error: error.message }, { status: 500 })

    }

}