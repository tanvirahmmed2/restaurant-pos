
import ConnectDB from '@/lib/database/mongo';
import { JWT_SECRET } from '@/lib/database/secret';
import Staff from '@/lib/models/staff';
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try {
        await ConnectDB()

        const { name, email, password,role } = await req.json()
        if (!name || !email || !password || !role ) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all information'
            }, { status: 400 })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newStaff = await Staff({ name, email, password: hashedPass,role })

        await newStaff.save()

        return NextResponse.json({
            success: true,
            message: 'Successfully created Staff',
            payload: newStaff
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to create Staff',
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
                message: "Staff id not found"
            }, { status: 400 })
        }

        
        const Staff = await Staff.findById(id)
        if (!Staff) {
            return NextResponse.json({
                success: false,
                message: 'Staff not found'
            }, { status: 400 })
        }

        const Staffs= await Staff.find({role: 'admin'})

        if(Staffs.length===1 && Staff.role ==='admin'){
            return NextResponse.json({
                success:false,
                message:"This account can't be removed"
            },{status:400})
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
        const token = (await cookies()).get('staff_token')?.value
        if (!token) {
            return NextResponse.json({ success: false, message: 'Please login' }, { status: 400 })
        }
        const decoded =  jwt.verify(token, JWT_SECRET)
        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Failed jwt verification' }, { status: 400 })
        }
        const Staff = await Staff.findById(decoded.id)
        if (!Staff) {
            return NextResponse.json({ success: false, message: 'Staff not found' }, { status: 400 })
        }
        return NextResponse.json({ success: true, message: 'Successfully verified Staff', payload: Staff }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to authenticate Staff', error: error.message }, { status: 500 })

    }

}