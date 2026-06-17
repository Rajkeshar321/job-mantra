import express from 'express';
import mongoose from 'mongoose';
import Enrollment from '../models/enrollment.js';
import Course from '../models/course.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/enrollments - Create enrollment
router.post('/', auth, async (req, res) => {
  try {
    const { courseId, courseTitle, price } = req.body;
    
    // Convert string userId from JWT to ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    // Check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, courseId });
    if (existing) {
      return res.status(400).json({ 
        success: false,
        message: 'You are already enrolled in this course' 
      });
    }

    const enrollment = new Enrollment({
      user: userId,
      courseId,
      courseTitle,
      price,
      status: 'active',
      enrolledAt: new Date()
    });

    await enrollment.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Enrolled successfully',
      enrollment 
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Enrollment failed', 
      error: error.message 
    });
  }
});

// GET /api/enrollments/check/:courseId - Check enrollment status
router.get('/check/:courseId', auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const enrollment = await Enrollment.findOne({
      user: userId,
      courseId: parseInt(req.params.courseId)
    });
    res.json({ 
      success: true,
      isEnrolled: !!enrollment,
      enrollment: enrollment || null
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// GET /api/enrollments/my - Get user's enrollments
router.get('/my', auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const enrollments = await Enrollment.find({ user: userId })
      .sort({ enrolledAt: -1 });
    res.json({ 
      success: true,
      enrollments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

export default router;