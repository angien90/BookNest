import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import compression from 'compression';

const app = express();

// --- Middleware ---

// Komprimera svar för att spara bandbredd
app.use(compression());

// Tillåt JSON i request body
app.use(express.json());

// Läs cookies från inkommande requests
app.use(cookieParser());

// Dynamiskt tillåtna origins för CORS (lokalt + prod)
const allowedOrigins = [
  'http://localhost:5173',
  'https://book-nest-client-three.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Tillåt även curl/postman (ingen origin)
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

// --- MongoDB ---
mongoose.connect(process.env.MONGODB_URL || "", {
  // Dessa kan hjälpa vid varningar (valfritt beroende på din mongoose-version)
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
