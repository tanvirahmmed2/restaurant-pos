import ConnectDB from "@/lib/database/mongo";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import User from "@/lib/models/user";
import { isLogin } from "@/lib/auth/middleware";


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
        const auth= await isLogin()
        if(!auth.success){
            return NextResponse.json({
                success:false,message:auth.message
            },{status:400})
        }
        
        return NextResponse.json({ success: true, message: 'Successfully verified user', payload: auth.payload }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to authenticate user', error: error.message }, { status: 500 })

    }

}

export async function PATCH(req) {
    try {
        await ConnectDB();

        const auth = await isLogin();
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: auth.message
            }, { status: 400 });
        }

        const authenticatedUser = auth.payload; 
        const { name, email, password } = await req.json();

        if (!name || !email) {
            return NextResponse.json({
                success: false, message: 'Please fill all info'
            }, { status: 400 });
        }

        const currentUser = await User.findById(authenticatedUser._id);
        if (!currentUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const isNameChanged = name !== currentUser.name;
        const isEmailChanged = email !== currentUser.email;
        
        let isPasswordChanged = false;
        if (password && password.trim() !== "") {
            const isMatching = await bcrypt.compare(password, currentUser.password);
            if (!isMatching) {
                isPasswordChanged = true;
            }
        }

        if (!isNameChanged && !isEmailChanged && !isPasswordChanged) {
            return NextResponse.json({
                success: false, 
                message: 'No changes detected' 
            }, { status: 200 }); 
        }

        const updateData = { name, email };
        if (isPasswordChanged) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        await User.findByIdAndUpdate(authenticatedUser._id, { $set: updateData });

        return NextResponse.json({
            success: true, 
            message: 'Profile updated successfully'
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 });
    }
}