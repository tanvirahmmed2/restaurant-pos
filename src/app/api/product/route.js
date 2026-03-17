import cloudinary from "@/lib/database/cloudinary";
import ConnectDB from "@/lib/database/mongo";
import Category from "@/lib/models/category";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import slugify from "slugify";


export async function GET(req) {
    try {
        await ConnectDB();

        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('q');

        let query = {};

        if (categoryId) {
            const category = await Category.findById(categoryId)
            
            if (!category) {
                return NextResponse.json({
                    success: false,
                    message: 'Category not found'
                }, { status: 400 });
            }
            
            query.categoryId = category._id;
        }

        const products = await Product.find(query)
            .populate('categoryId', 'name slug')
            .sort({ createdAt: -1 })
            .lean();

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No products found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Products fetched successfully',
            payload: products
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch data',
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await ConnectDB();

        const formData = await req.formData();

        const title = formData.get('title');
        const description = formData.get('description');
        const imageFile = formData.get('image');
        const categoryId = formData.get('categoryId');
        const price = Number(formData.get('price'));
        const discount = Number(formData.get('discount')) || 0;

        if (!title || !description || !categoryId || !price) {
            return NextResponse.json({
                success: false,
                message: 'Please fill all required information'
            }, { status: 400 });
        }

        if (!imageFile) {
            return NextResponse.json({
                success: false,
                message: 'Please add an image'
            }, { status: 400 });
        }

        const slug = slugify(title, { lower: true, strict: true });

        const existProduct = await Product.findOne({ slug });
        if (existProduct) {
            return NextResponse.json({
                success: false,
                message: 'A product with this title already exists'
            }, { status: 400 });
        }

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const cloudImage = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "restaurant-pos" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const newProduct = new Product({
            title,
            slug,
            description,
            price,
            discount,
            image: cloudImage.secure_url,
            imageId: cloudImage.public_id,
            categoryId
        });

        await newProduct.save();

        return NextResponse.json({
            success: true,
            message: 'Successfully added new product',
            payload: newProduct
        }, { status: 201 });

    } catch (error) {
        console.error("POST_PRODUCT_ERROR:", error);
        return NextResponse.json({
            success: false,
            message: 'Failed to add product',
            error: error.message
        }, { status: 500 });
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

        await cloudinary.uploader.destroy(product.imageId)

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