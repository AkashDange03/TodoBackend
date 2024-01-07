import mongoose from "mongoose";

export const connect = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"BackendTodo"
    })
    .then(() => console.log("database connected succesfully"))
    .catch((e) => console.log(e));
}