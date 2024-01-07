import mongoose from "mongoose";

export const connect = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"BackendTodo"
    })
    .then((c) => console.log(`database connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
}