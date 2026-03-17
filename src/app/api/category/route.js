import cloudinary from "@/lib/database/cloudinary";
import ConnectDB from "@/lib/database/mongo";
import Category from "@/lib/models/category";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function GET() {
    try {
        await ConnectDB()
        const cat = await Category.find({}).sort({ createdAt: -1 }).lean()
        if (!cat || cat.length === 0) {
            return NextResponse.json({
                success: false, message: 'No category found'
            }, { status: 400 })
        }
        return NextResponse.json({
            success: true, message: 'Successfully fetched data', payload: cat
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}

export async function POST(req) {
    try {
        await ConnectDB()
        const formData = await req.formData()
        const name = formData.get('name')

        const slug = slugify(name, { strict: true })
        const isExist = await Category.findOne({ slug: slug })

        if (isExist) {
            return NextResponse.json({
                success: false, message: 'Category Already exist'
            }, { status: 400 })
        }

        const imageFile = formData.get('image')
        if (!imageFile) {
            return NextResponse.json({
                success: false, message: 'Please upload cover image'
            },{status:400})
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

        const newCat= new Category({name, slug, image:cloudImage.secure_url, imageId:cloudImage.public_id})
        await newCat.save()
        return NextResponse.json({
            success:true, message:'Succfully created category', payload:newCat
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success: false, message: error.message
        }, { status: 500 })

    }

}

export async function DELETE(req) {
    try {
        await ConnectDB()
        const {id}= await req.json()
        if(!id){
            return NextResponse.json({
                success:false, message:'Id not found'
            })
        }
        const cat= await Category.findById(id)
        if(!cat){
            return NextResponse.json({
                success:false, message:'Category not found'
            },{status:400})
        }

        await cloudinary.uploader.destroy(cat.imageId)

        await Category.findByIdAndDelete(id)

        return NextResponse.json({
            success:true, message:'Successfully deleted category'
        })
    } catch (error) {
        return NextResponse.json({
            success:false, message:error.message
        },{status:500})
    }
    
}