import connectToDB from "@/database"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"


export async function DELETE(req){

    try{
        await connectToDB()
        const {searchParams}= new URL(req.url)
        const getCurrentBlogID = searchParams.get('id')
        if(!getCurrentBlogID){
            return NextResponse.json({
                success:false,
                message:'Blog Id is Required'
            })
        }
        const deleteCurrentBlogbyID = await Blog.findByIdAndDelete(getCurrentBlogID)
            if(deleteCurrentBlogbyID){
                return NextResponse.json({
                    success:true,
                    message:'blog Deleted successfully'
                })
            }
        

    }catch(err){
        console.log(err)
        return NextResponse.json({
            succcess:false,
            message:'Something Went Wrong Please Try Agian Later'
        })
    }
}