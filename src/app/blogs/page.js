import BlogOverView from "@/components/blog-overview"


async function fetchaAllBlogs() {
    try{
        const apiResponse = await fetch('http://localhost:3000/api/get-blogs',{
            method:'GET',
            cache:'no-store'

        })
        const result = await apiResponse.json()
        return result?.data


    }catch(err){
        console.log(err)
    }
    
}

export default async function Blogs (){

    const blogList = await fetchaAllBlogs()
   

    return <BlogOverView blogList={blogList}/>
}
