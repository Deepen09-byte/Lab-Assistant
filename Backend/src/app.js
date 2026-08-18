import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import morgan from "morgan"
import cors from "cors"

// Create Express app instance
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"))
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
  methods:["GET", "POST", "PUT", "DELETE"],
}))


// Basic Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lab Assistant API' });
});

app.use("/api/auth", authRouter)

export default app;
