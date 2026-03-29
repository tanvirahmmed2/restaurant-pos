
import ConnectDB from '@/lib/database/mongo';
import Staff from '@/lib/models/staff';
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server';
import { isAdmin, isStaff } from '@/lib/auth/staffmiddleware';


export async function POST(req) {
    try {
        await ConnectDB()
        const auth = await isAdmin()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 })
        }
        const { name, email, password, role } = await req.json()
        if (!name || !email || !role) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all information'
            }, { status: 400 })
        }
        if (!password || password.trim().length < 6) {
            return NextResponse.json({
                success: false, message: 'Enter atleast 6 digit password'
            }, { status: 400 })
        }
        const hashedPass = await bcrypt.hash(password, 10);

        const newStaff = await Staff({ name, email, password: hashedPass, role })

        await newStaff.save()

        return NextResponse.json({
            success: true,
            message: 'Successfully created Staff',
            payload: newStaff
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
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
                message: "Staff id not found"
            }, { status: 400 })
        }


        const staff = await Staff.findById(id)
        if (!Staff) {
            return NextResponse.json({
                success: false,
                message: 'Staff not found'
            }, { status: 400 })
        }

        const Staffs = await Staff.find({ role: 'admin' })

        if (Staffs.length === 1 && staff.role === 'admin') {
            return NextResponse.json({
                success: false,
                message: "This account can't be removed"
            }, { status: 400 })
        }


        await Staff.findByIdAndDelete(id)

        return NextResponse.json({
            success: true,
            message: 'Account has been deleted'
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to delete Staff',
            error: error.message
        }, { status: 500 })

    }

}

export async function GET() {
    try {
        await ConnectDB()
        const auth= await isStaff()
        if(!auth.success){
            return NextResponse.json({
                success:false, message:auth.message
            },{status:400})
        }
        return NextResponse.json({ success: true, message: 'Successfully verified Staff', payload: auth.payload }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })

    }

}


export async function PATCH(req) {
    try {
        await ConnectDB()
        const auth = await isStaff()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 })
        }
        const staff = auth.payload
        const { password } = await req.json()
        if (!password || password.trim().length < 6) {
            return NextResponse.json({
                success: false, message: 'Enter atleast 6 digit password'
            }, { status: 400 })
        }
        const isMatchPassword = await bcrypt.compare(password, staff.password)

        if (isMatchPassword) {
            return NextResponse.json({
                success: false,
                message: 'Please try new password'
            }, { status: 400 })
        }
        const hashPass = await bcrypt.hash(password, 10)

        await Staff.findByIdAndUpdate(staff._id, { $set: { password: hashPass } })
        return NextResponse.json({
            success: true,
            message: 'Password updated successfully'
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}