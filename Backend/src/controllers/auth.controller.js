import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or username",
        err: "User already exists"
      });
    }

    // Create new user
    const user = await userModel.create({ username, email, password });

    await sendEmail({
        to: email,
        subject:"Welcome to Lab-Assistant",
        html:`<p>Hi ${username},</p>
        <p>Thankyou for registering at <strong>Lab-Assistant.</strong> We are excited to have you on board </p>
        <p>Best regards,<br> Lab-Assistant Team</p>`

    })

    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}
