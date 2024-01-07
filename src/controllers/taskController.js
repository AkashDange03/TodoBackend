import ErrorHandler from "../middlewear/err.js";
import { Task } from "../models/task.js";

export const addTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({ title, description, user: req.user, })
        res.status(201).json({
            success: true,
            message: "task created"
        })
    } catch (error) {
        next(error)
    }

}

export const getallTask = async (req, res, next) => {
    try {
        const taskList = await Task.find({ user: req.user });
        res.status(200).json({
            success: true,
            taskList
        })
    } catch (error) {
        next(error)
    }

}

export const updateTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return next(new ErrorHandler("not available", 500));
        }

        task.iscompleted = !task.iscompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "task updated"
        })
    } catch (error) {
        next(error)
    }


}

export const deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return next(new ErrorHandler("already delete", 500));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        })
    } catch (error) {
        next(error)
    }



}