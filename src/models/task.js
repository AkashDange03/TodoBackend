import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})

export const Task = mongoose.model("Task",TaskSchema);