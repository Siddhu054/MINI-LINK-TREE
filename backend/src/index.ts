import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import linkRoutes from './routes/links';
import path from 'path';

// Load environment variables first - keep this for other env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Updated CORS configuration
app.use(cors({
  origin: '*', // Temporarily allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});


app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Add this route after your other routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Basic error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

console.log('Starting server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGODB_URI?.substring(0, 20) + '...');