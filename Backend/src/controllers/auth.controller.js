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

    const emailVerificationToken = jwt.sign({
      email: user.email,
    },process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject:"Welcome to Lab-Assistant",
        html:`<p>Hi ${username},</p>
        <p>Thankyou for registering at <strong>Lab-Assistant.</strong> We are excited to have you on board </p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
        <p>If you did not create an account, please ignore this mail.
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

export async function login(req,res){
  
}

export async function verifyEmail(req, res) {

  const {token} = req.query;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({email: decoded.email})

  if(!user){
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      err: "User not found"
    })
  }

  user.verified = true;

  await user.save();

  const html = 
  `
  <h1>Email Verified Successfully!</h1>
  <p>Your email has been verified. You can now log in to your account.</p>
  <a href="http://localhost:3000/login">Go to Login</a>
  `
  res.send(html);
}
