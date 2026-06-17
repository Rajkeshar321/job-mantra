import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  body('phone').notEmpty().withMessage('Phone is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, password, phone, targetExam } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name, email, password, phone, targetExam
  });

  res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      targetExam: user.targetExam,
      role: user.role
    }
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      targetExam: user.targetExam,
      role: user.role,
      enrolledCourses: user.enrolledCourses,
      testScores: user.testScores
    }
  });
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

// Logout (client-side token removal, but we can track it)
router.post('/logout', auth, async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;