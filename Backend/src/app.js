import express from 'express';
import cookieParser from 'cookie-parser';

// Create Express app instance
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lab Assistant API' });
});


export default app;
