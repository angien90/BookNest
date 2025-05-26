import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression';

const app = express();

// --- Middleware ---
app.use(compression());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://book-nest-client-three.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// --- Routes ---
import bookRouter from './routes/books';
import userRouter from './routes/users';
import reviewRouter from './routes/review';
import authRouter from './routes/auth';

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/review', reviewRouter);
app.use('/auth', authRouter);

// --- Async function för att ansluta till MongoDB ---
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// --- Anslut till DB, starta sedan servern ---
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
