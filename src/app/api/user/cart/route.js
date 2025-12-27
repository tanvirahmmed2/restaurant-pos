import ConnectDB from "@/lib/database/mongo";
import { isLogin } from "@/lib/middleware";
import Product from "@/lib/models/product";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await ConnectDB();

        const auth = await isLogin()
        if (!auth.success) {
            return NextResponse.json({
                success: false, message: 'Please log in'
            }, { status: 400 })
        }

        const { title, productId, quantity } = await req.json();

        if (!productId) {
            return NextResponse.json({ success: false, message: 'Missing data' }, { status: 400 });
        }

        const product = await Product.findById(productId)

        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 400 })
        }


        if (!product.isAvailable) {
            return NextResponse.json({
                success: false,
                message: 'Product is not availavle right now'
            }, { status: 400 })
        }

        const user = auth.payload

        const singleProductPrice = product.price - product.discount

        const existingItem = user.cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += (quantity || 1);
            existingItem.price += singleProductPrice * quantity || 1
        } else {
            user.cart.push({ title, productId, quantity, price: singleProductPrice });
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Added to cart',
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