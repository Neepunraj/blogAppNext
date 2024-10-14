import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:String,
    description:String
})

// api routing add,fetch ,update and delete it usin api route 





const Blog = mongoose.models.Blog || mongoose.model ("Blog",BlogSchema)

export default Blog