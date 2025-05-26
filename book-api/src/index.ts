import 'dotenv/config';
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
  origin: "https://book-nest-client-three.vercel.app",
  /* origin: "http://localhost:5173", */
  credentials: true    // Tillåter cookies skickas till API:et
}));

// Routes
import bookRouter from './routes/books';
import userRouter from './routes/users';
import reviewRouter from './routes/review';
import authRouter from './routes/auth';

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/review', reviewRouter);
app.use('/auth', authRouter);

// Async function för att koppla upp mot MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Avslutar servern om den inte kan koppla upp sig
  }
}

// Koppla upp mot databasen och starta sedan servern
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
});