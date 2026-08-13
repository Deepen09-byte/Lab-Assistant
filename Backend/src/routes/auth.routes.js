import { Router } from "express";
import { register, verifyEmail, login } from "../controllers/auth.controller.js";
import { registerValidation } from "../validators/auth.validator.js";

const authRouter = Router()

authRouter.post("/register", registerValidation, register)

authRouter.post("/login",login)

authRouter.get("/verify-email",verifyEmail)

export default authRouter