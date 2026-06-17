import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get profile
router.get('/profile', auth, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  const { name, phone, targetExam, avatar } = req.body;
  const user = req.user;
  
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (targetExam) user.targetExam = targetExam;
  if (avatar) user.avatar = avatar;

  await user.save();
  res.json(user);
});

// Get dashboard data
router.get('/dashboard', auth, async (req, res) => {
  const user = await req.user.populate('enrolledCourses testScores.test');
  
  res.json({
    stats: {
      coursesEnrolled: user.enrolledCourses.length,
      testsTaken: user.testScores.length,
      avgScore: user.testScores.length 
        ? (user.testScores.reduce((a, b) => a + b.percentage, 0) / user.testScores.length).toFixed(1)
        : 0
    },
    recentTests: user.testScores.slice(-5).reverse(),
    enrolledCourses: user.enrolledCourses
  });
});

export default router;