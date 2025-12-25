import ConnectDB from "@/lib/database/mongo";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await ConnectDB();

        const { userId, title, productId, quantity } = await req.json();

        if (!userId || !productId) {
            return NextResponse.json({ success: false, message: 'Missing data' }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const existingItem = user.cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += (quantity || 1);
        } else {
            user.cart.push({ title, productId, quantity });
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Cart updated',
            cart: user.cart
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await ConnectDB();

        const { userId, productId } = await req.json();

        if (!userId || !productId) {
            return NextResponse.json({
                success: false,
                message: 'User ID and Product ID are required'
            }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { cart: { productId: productId } }
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Item removed from cart',
            cart: updatedUser.cart
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to remove item',
            error: error.message
        }, { status: 500 });
    }
}