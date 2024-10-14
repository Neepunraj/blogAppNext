import connectToDB from "@/database"
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server"


const AddnewBlog = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
})


export async function POST(req){

    try{
        await connectToDB()
        const extractBlogData = await req.json();

        const {title,description} = extractBlogData

        const {error} = AddnewBlog.validate({
            title,description
        })
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }

        const newlycreatedBlogItem = await Blog.create(extractBlogData)
        if(newlycreatedBlogItem){
            return NextResponse.json({
                success:true,
                message:"Blog Added Successfully"
            })
        }else{
            return NextResponse.json({
                success:false,
                message:'Something went wrong!! unable to add Blog'
            })
        }


    }catch(err){
        console.log(err)
        return NextResponse.json({
            success:false,
            message:"something Went Wrong Please Try again later"
        })
    }
}