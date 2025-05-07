import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",         
  credentials: true    // Allows cookies sent to this API
}));        


// Routes
import bookRouter from './routes/books'
import userRouter from './routes/user'
import reviewRouter from './routes/review'
app.use('/books', bookRouter)
app.use('/user', userRouter)
app.use('/review', reviewRouter)

// Connect To DB
mongoose.connect(process.env.MONGODB_URL || "");

// Start the express server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})