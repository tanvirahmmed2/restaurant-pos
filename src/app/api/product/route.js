import cloudinary from "@/lib/database/cloudinary";
import ConnectDB from "@/lib/database/mongo";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import slugify from "slugify";


export async function GET() {
    try {
        await ConnectDB()

        const products = await Product.find({}).sort({ createdAt: -1 }).lean()

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No product data found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Product data fetched successfully',
            payload: products
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch data',
            error: error.message
        }, { status: 500 })

    }

}

export async function POST(req) {
    try {
        await ConnectDB()

        const formData = await req.formData()

        const title = formData.get('title')
        const description = formData.get('description')
        const imageFile = formData.get('image')
        const category = formData.get('category')
        const price = formData.get('price')
        if (!title || !description || !category || !price) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all information'
            }, { status: 400 })
        }

        if (!imageFile) {
            return NextResponse.json({
                success: false,
                message: 'Please ad an image'
            }, { status: 400 })
        }
        const slug = slugify(title, { strict: true })

        const existProduct = await Product.findOne({ slug })

        if (existProduct) {
            return NextResponse.json({
                success: false,
                message: 'Product available with this title, please change'
            }, { status: 400 })
        }

        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

        const cloudImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "restaurant-pos" },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
            stream.end(imageBuffer);
        });

        const newProduct = new Product({ title, slug, description, price, image: cloudImage.secure_url, imageId: cloudImage.public_id, category })

        await newProduct.save()
        return NextResponse.json({
            success: true,
            message: 'Successfully added new product',
            payload: newProduct
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to add product',
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
                message: 'Id not found'
            }, { status: 400 })
        }

        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 400 })
        }

        await cloudinary.uploader.destroy(product.image_id)

        await Product.findByIdAndDelete(id)

        return NextResponse.json({
            success: true,
            message: 'Successfully deleted product'
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to delete product',
            error: error.message
        }, { status: 500 })

    }

}