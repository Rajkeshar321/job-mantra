import './config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import testRoutes from './routes/tests.js';
import userRoutes from './routes/users.js';
import enrollmentRoutes from './routes/enrollments.js';
import paymentRoutes from './routes/payment.js';

const app = express();        // ← MUST come before app.use()

// Middlewarea
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);  // ← MOVED here (was before app = express())

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

// DB connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));