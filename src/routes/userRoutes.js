import express from "express";
import { createUser, getUserProfile, userLogin, userLogout,getAlluser, getUserById } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewear/auth.js";

const router = express.Router()

router.post("/register",createUser);
router.post("/login",userLogin);
router.get("/logout",userLogout);
router.get("/me",isAuthenticated,getUserProfile);
router.get("/all",isAuthenticated,getAlluser);
router.get("/userid/:id",isAuthenticated,getUserById);


export default router;

