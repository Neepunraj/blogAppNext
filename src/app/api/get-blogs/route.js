import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await connectToDB();
        const extractAllBlogs = await Blog.find({});
        if(extractAllBlogs){
            return NextResponse.json({
                success:true,
                data:extractAllBlogs
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:'Unable to retrive Blogs'

            })
        }

    }catch(error){
        return NextResponse.json({
            success:false,
            message:'Something Went Wrong Please try again Later'
        })
    }
}