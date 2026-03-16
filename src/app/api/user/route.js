import ConnectDB from "@/lib/database/mongo";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/lib/models/user";
import { cookies } from "next/headers";


export async function POST(req) {
    try {
        await ConnectDB()

        const { name, email, password } = await req.json()
        if (!name || !email || !password ) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all information'
            }, { status: 400 })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = await User({ name, email, password: hashedPass })

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

        const { id } = await req.json()
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "User id not found"
            }, { status: 400 })
        }

        
        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 400 })
        }


        await User.findByIdAndDelete(id)

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