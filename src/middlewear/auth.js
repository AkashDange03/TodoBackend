import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./err.js";

export const isAuthenticated = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new ErrorHandler("please login"), 404);
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRETE);
        req.user = await User.findById(decoded);
        next();
    } catch (error) {
        next(error)
    }



}