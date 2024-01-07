import { User } from "../models/user.js";
import { sendcookie } from "../utilities/utils.js";
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewear/err.js";

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
    
        if (user) {
            return next(new ErrorHandler("user already exists", 404));
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });
    
        sendcookie(user, res, "User Created successfully", 200);
    } catch (error) {
        next(error)
    }
   
}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Please register"), 404)
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(new ErrorHandler("invalid email or password"), 404)
        }
        sendcookie(user, res, `welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }


}

export const userLogout = (req, res) => {
    res.status(200).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: "deleted"
    })
}

export const getUserProfile = async (req, res, next) => {
    try {
        const { name, email } = req.user;

        const user = await User.findOne({ email });

        res.status(200).json({
            success: true,
            message: "user found",
            userprofile: user
        })
    } catch (error) {
        next(error)
    }


}

export const getAlluser = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "user found",
            userprofile: users
        })
    } catch (error) {
        next(error)
    }

}

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: "user found",
            userprofile: user
        })
    } catch (error) {
        next(error)
    }

}