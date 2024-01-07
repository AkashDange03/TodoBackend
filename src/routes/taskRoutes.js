import express from "express"
import { isAuthenticated } from "../middlewear/auth.js";
import { addTask, deleteTask, getallTask, updateTask,  } from "../controllers/taskController.js";

const router = express.Router();

router.post("/addTask",isAuthenticated,addTask);
router.get("/allTasks",isAuthenticated,getallTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)

export default router;