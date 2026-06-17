import express from 'express';
import Test from '../models/test.js';
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all tests
router.get('/', async (req, res) => {
  const tests = await Test.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(tests);
});

// Get weekly tests
router.get('/weekly', async (req, res) => {
  const tests = await Test.find({ type: 'weekly', isActive: true });
  res.json(tests);
});

// Get single test
router.get('/:id', async (req, res) => {
  const test = await Test.findById(req.params.id).select('-questions.correctAnswer');
  if (!test) return res.status(404).json({ message: 'Test not found' });
  res.json(test);
});

// Submit test
router.post('/:id/submit', auth, async (req, res) => {
  const { answers } = req.body; // { questionIndex: selectedOptionIndex }
  const test = await Test.findById(req.params.id);
  
  if (!test) return res.status(404).json({ message: 'Test not found' });

  let score = 0;
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  test.questions.forEach((q, idx) => {
    const userAnswer = answers[idx];
    if (userAnswer === undefined || userAnswer === -1) {
      unattempted++;
    } else if (userAnswer === q.correctAnswer) {
      score += q.marks;
      correct++;
    } else {
      score -= q.negativeMarks;
      wrong++;
    }
  });

  const result = {
    test: test._id,
    score,
    total: test.totalMarks,
    correct,
    wrong,
    unattempted,
    percentage: (score / test.totalMarks * 100).toFixed(2)
  };

  req.user.testScores.push(result);
  await req.user.save();

  res.json({ message: 'Test submitted', result });
});

// Get user's test results
router.get('/results', auth, async (req, res) => {
  res.json(req.user.testScores);
});

export default router;