import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";




const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})
export async function PUT(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url)
        const getcurrentID = searchParams.get('id')
        if (!getcurrentID) {
            return NextResponse.json({
                success: false,
                message: 'Blog ID is Required'
            })
        }

        const { title, description } = await req.json()
        const { error } = EditBlog.validate({
            title, description
        })
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }
        const updateBlogbyId = await Blog.findOneAndUpdate({
            _id: getcurrentID
        }, { title, description }, { new: true })
        if (updateBlogbyId) {
            return NextResponse.json({
                success: true,
                message: 'Updated Successfully'
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'Unable to update Pelase try again Later'
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'Something Went Wrong Please Try Again Later'
        })
    }

}