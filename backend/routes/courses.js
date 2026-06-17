import express from 'express';
import Course from '../models/Course.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  const { category, type, search } = req.query;
  let query = { isActive: true };

  if (category) query.category = category;
  if (type) query.type = type;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const courses = await Course.find(query).sort({ createdAt: -1 });
  res.json(courses);
});

// Get single course
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
});

// Get free courses
router.get('/free', async (req, res) => {
  const courses = await Course.find({ type: 'free', isActive: true });
  res.json(courses);
});

// Get live courses
router.get('/live', async (req, res) => {
  const courses = await Course.find({ type: 'live', isActive: true });
  res.json(courses);
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const user = req.user;
  if (user.enrolledCourses.includes(course._id)) {
    return res.status(400).json({ message: 'Already enrolled' });
  }

  user.enrolledCourses.push(course._id);
  await user.save();
  course.students.push(user._id);
  await course.save();

  res.json({ message: 'Enrolled successfully', course });
});

export default router;