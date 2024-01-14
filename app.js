import express from "express"
import UserRoute from "./src/routes/userRoutes.js"
import TaskRoute from "./src/routes/taskRoutes.js"
import { connect } from "./src/data/database.js";
import cookieParser from "cookie-parser";
import { errorMiddleWear } from "./src/middlewear/err.js";
import { config } from "dotenv";
import cors from "cors";
const app = express();
config({
    path: "./src/data/config.env"
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/tasks", TaskRoute);
app.use(errorMiddleWear);

connect();
app.listen(process.env.PORT, () => {
    console.log("Server running at port: 4000")
})

