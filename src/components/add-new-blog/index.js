import { Fragment } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function AddNewBlog({ openBlogDialog, setOpenBlogDialog,
    blogFormData, setBlogformData,
    loading, setLoading, handleSaveBlogData,
    currentEditBlogId,
    setCurrenteditBlogID
}) {


    return (
        <Fragment>

            <div className="mt-4">
                <Button onClick={() => setOpenBlogDialog(true)} >Add New Blog</Button>

            </div>

            <Dialog open={openBlogDialog} onOpenChange={()=>{
                setOpenBlogDialog(false)
                setBlogformData({
                    title:'',
                    description:''
                })
                setCurrenteditBlogID(null)
            }}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{ currentEditBlogId?"Edit Blog":"Add New blog"}</DialogTitle>

                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name='title'
                                placeholder='Enter blog Title'
                                value={blogFormData.title}
                                onChange={(e) => setBlogformData({ ...FormData, title: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input

                                name="description"
                                value={blogFormData.description}
                                onChange={(e) => {
                                    setBlogformData({
                                        ...blogFormData, description: e.target.value
                                    })
                                }}
                                id="description"

                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSaveBlogData}
                            type="button">
                            {
                                loading ?"Saving Changes":"Save Changes"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </Fragment>
    )
}