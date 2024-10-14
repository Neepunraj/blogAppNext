
'use client'




import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Label } from "../ui/label"

const initialBlogFormData = {
    title: '',
    description: ''

}

export default function BlogOverView({ blogList }) {
    const [openBlogDialog, setOpenBlogDialog] = useState(false)
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogformData] = useState(initialBlogFormData)
    const [currentEditBlogId, setCurrenteditBlogID] = useState(null)
    const router = useRouter();

    useEffect(() => {
        router.refresh()

    }, [])
    console.log(blogFormData)

    async function handleSaveBlogData() {
        try {
            setLoading(true)
            const apiResponse = currentEditBlogId !== null ?
                await fetch(`/api/update-blog?id=${currentEditBlogId}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData)
                }) : await fetch('/api/add-blog', {
                    method: "POST",
                    body: JSON.stringify(blogFormData)
                })
            const result = await apiResponse.json();

            if (result?.success) {
                setBlogformData(initialBlogFormData)
                setLoading(false)
                setOpenBlogDialog(false)
                setCurrenteditBlogID(null)
                router.refresh()


            }

        } catch (error) {
            console.log(error)
            setBlogformData(initialBlogFormData)
            setLoading(false)
        }


    }
    async function handleDeleteBlogByID(id) {

        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
                method: 'DELETE'
            })
            const result = await apiResponse.json()
            if (result?.success) {
                router.refresh()
            }

        } catch (err) {
            console.log(err)
        }

    }
    async function handleEditbyID(cItem) {
        setCurrenteditBlogID(cItem._id)
        setBlogformData({
            title: cItem.title,
            description: cItem.description
        })
        setOpenBlogDialog(true)

    }


    return <div className="min-h-screen flex flex-col gap-10   bg-gradient-to-r from-purple-500 to-blue-600">
        <AddNewBlog openBlogDialog={openBlogDialog}
            setOpenBlogDialog={setOpenBlogDialog}
            loading={loading}
            setLoading={setLoading}
            blogFormData={blogFormData}
            setBlogformData={setBlogformData}
            handleSaveBlogData={handleSaveBlogData}
            currentEditBlogId={currentEditBlogId}
            setCurrenteditBlogID={setCurrenteditBlogID}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {
                blogList && blogList.length > 0 ?
                    blogList.map(item =>
                        <Card className='p-5 ml-5' key={item._id}>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>

                            </CardHeader>
                            <CardContent>

                                <CardDescription >{item.description}</CardDescription>
                                <div className="mt-5 flex gap-4 justify-center items-center">
                                    <Button
                                        onClick={() => handleEditbyID(item)}
                                        className='w-full'>Edit</Button>
                                    <Button className='w-full'
                                        onClick={() => {
                                            handleDeleteBlogByID(item._id)
                                        }}>Delete</Button>
                                </div>
                            </CardContent>

                        </Card>
                    )
                    : null
            }

        </div>


    </div>

}