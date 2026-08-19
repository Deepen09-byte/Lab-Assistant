import { Router } from "express";
import { sendMessage } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const chatRouter = Router()

chatRouter.post("/message", authMiddleware, sendMessage)
 
export default chatRouter