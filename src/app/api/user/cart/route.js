import ConnectDB from "@/lib/database/mongo";
import Product from "@/lib/models/product";
import User from "@/lib/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@/lib/database/secret";

export async function POST(req) {
    try {
        await ConnectDB();

        const token = (await cookies()).get('user_token')?.value
        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Please login first'
            }, { status: 400 })
        }
        const decoded = await jwt.verify(token, JWT_SECRET)

        const { title, productId, quantity = 1 } = await req.json();

        if (!productId) {
            return NextResponse.json(
                { success: false, message: 'Missing productId' },
                { status: 400 }
            );
        }

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        if (!product.isAvailable) {
            return NextResponse.json(
                { success: false, message: 'Product is not available right now' },
                { status: 400 }
            );
        }

        const user = await User.findById(decoded.id);

        const singleProductPrice = product.price - product.discount;

        const existingItem = user.cart.find(
            item => item.productId.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price += singleProductPrice * quantity;
        } else {
            user.cart.push({
                title,
                productId,
                quantity,
                price: singleProductPrice * quantity
            });
        }

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Added to cart',
                cart: user.cart
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await ConnectDB();
        const token = (await cookies()).get('user_token')?.value
        if (!token) {
            return NextResponse.json({
                success: false,
                message: 'Please login first'
            }, { status: 400 })
        }
        const decoded =  jwt.verify(token, JWT_SECRET)

        const {  productId } = await req.json();

        if (!productId) {
            return NextResponse.json({
                success: false,
                message: ' Product ID  required'
            }, { status: 400 });
        }
        const userId= decoded.id

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