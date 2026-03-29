import ConnectDB from "@/lib/database/mongo";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, NODE_ENV } from "@/lib/database/secret";
import Staff from "@/lib/models/staff";
import { isStaff } from "@/lib/auth/staffmiddleware";


export async function POST(req) {
    try {

        await ConnectDB()
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: 'Please provide email and password'
            }, { status: 400 })
        }

        const staff = await Staff.findOne({ email })

        if (!staff) {
            return NextResponse.json({
                success: false,
                message: 'No account found with this email'
            }, { status: 400 })
        }

        if (staff.isBanned) {
            return NextResponse.json({
                success: false,
                message: 'staff is banned'
            }, { status: 400 })
        }


        const isMatchPassword = await bcrypt.compare(password, staff.password)

        if (!isMatchPassword) {
            return NextResponse.json({
                success: false,
                message: 'Incorrect password'
            }, { status: 400 })
        }

        const payload = { id: staff._id, role: staff.role }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        const response = NextResponse.json(
            {
                success: true,
                message: "Successfully logged in",
            },
            { status: 200 }
        );

        response.cookies.set("staff_token", token, {
            httpOnly: true,
            secure: NODE_ENV,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Failed to login',
            error: error.message
        }, { status: 500 })
    }

}


export async function GET() {

    try {
        const auth = await isStaff()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 })
        }

        const res = NextResponse.json({
            success: true,
            message: "Logout successful",
        });


        res.cookies.set("staff_token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        });

        return res;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "failed to logout",
            error: error.message
        }, { status: 500 })
    }
}


export async function DELETE() {
    try {
        const auth = await isStaff()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 })
        }
        const staff = auth.payload
        const Admins = await Staff.find({ role: 'admin' })

        if (Admins.length === 1 && staff.role === 'admin') {
            return NextResponse.json({
                success: false,
                message: "This account can't be removed"
            }, { status: 400 })
        }
        await Staff.findByIdAndDelete(staff._id)
        return NextResponse.json({
            success:true, message:'Successfully deleted account'
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}