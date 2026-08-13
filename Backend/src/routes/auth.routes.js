import { Router } from "express";
import { register, verifyEmail, login, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";

const authRouter = Router()

authRouter.post("/register", registerValidation, register)

authRouter.post("/login",login)

authRouter.get("get-me",authMiddleware, getMe)

authRouter.get("/verify-email",loginValidation, verifyEmail)

export default authRouter