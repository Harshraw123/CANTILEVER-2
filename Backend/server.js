import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from './routes/UserRoute.js';
import TaskRouter from './routes/TaskRoute.js';

dotenv.config(); //  Load environment variables

const app = express();
const port = process.env.PORT || 4000; // ✅ PORT should be uppercase

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://taskflow-web-app.vercel.app','https://taskflow1-web.netlify.app'],
  // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connect
connectDB(); 

app.get('/', (req, res) => {
  res.send('Hello from the server! The app is working.'); // Send some text or HTML
});
// Routes
app.use('/api/user',userRouter)
app.use('/api/task',TaskRouter)

// Start server
app.listen(port, () => {
  console.log(`✅ Server started on http://localhost:${port}`);
});
