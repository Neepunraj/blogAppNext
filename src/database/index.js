
/* mongodb+srv://neepushre97:<db_password>@cluster0.geesf.mongodb.net/ */

import mongoose from "mongoose";

const connectToDB = async ()=>{
    const connectionUrl = "mongodb+srv://neepushre97:V5MnTsrDhpuw5zU3@cluster0.geesf.mongodb.net/";
    mongoose.connect(connectionUrl)
    .then(()=>console.log('connected to Database Successfully'))
    .catch(err=>console.log(err))
}

export default connectToDB