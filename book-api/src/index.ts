import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression'; 

const app = express();

// Minskar datamängden 
app.use(compression());

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  /* origin: "https://book-nest-client-three.vercel.app", */
  origin: "http://localhost:5173",   
  credentials: true    // Allows cookies sent to this API
}));        

// Routes
import bookRouter from './routes/books'
import userRouter from './routes/users'
import reviewRouter from './routes/review'
import authRouter from './routes/auth'
app.use('/books', bookRouter)
app.use('/users', userRouter)
app.use('/review', reviewRouter)
app.use('/auth', authRouter)

// Connect To DB
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})