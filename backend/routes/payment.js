import express from 'express';
import crypto from 'crypto';
import Enrollment from '../models/enrollment.js';
import razorpay from '../config/razorpay.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create Order
router.post('/create-order', auth, async (req, res) => {
  console.log('=== CREATE ORDER ===');
  console.log('User from auth:', req.user);
  console.log('Request body:', req.body);
  
  try {
    const { amount, courseId, courseTitle } = req.body;

    if (!amount || !courseId || !courseTitle) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: amount, courseId, courseTitle' 
      });
    }

    // Check if already enrolled AND payment completed
    const existing = await Enrollment.findOne({ 
      user: req.user.id, 
      courseId,
      paymentStatus: 'captured'
    });
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already enrolled in this course' 
      });
    }

    // Check for pending enrollment from previous failed attempt
    let enrollment = await Enrollment.findOne({
      user: req.user.id,
      courseId,
      paymentStatus: 'pending'
    });

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseId: courseId.toString(),
        userId: req.user.id.toString(),
        courseTitle
      }
    };

    const order = await razorpay.orders.create(options);

    if (enrollment) {
      enrollment.orderId = order.id;
      enrollment.price = amount;
      await enrollment.save();
    } else {
      enrollment = await Enrollment.create({
        user: req.user.id,
        courseId,
        courseTitle,
        price: amount,
        orderId: order.id,
        paymentStatus: 'pending',
        status: 'active'
      });
    }

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify Payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      await Enrollment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { paymentStatus: 'failed' }
      );
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    const enrollment = await Enrollment.findOneAndUpdate(
      { orderId: razorpay_order_id, user: req.user.id },
      {
        paymentId: razorpay_payment_id,
        paymentSignature: razorpay_signature,
        paymentStatus: payment.status === 'captured' ? 'captured' : 'authorized',
        paymentMethod: payment.method,
        status: 'active'
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment not found' });
    }

    res.json({ 
      success: true, 
      message: 'Payment verified successfully',
      enrollment 
    });
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// TEST: Simulate successful payment (development only)
router.post('/test-verify', auth, async (req, res) => {
  try {
    const { courseId, courseTitle, price } = req.body;
    
    const enrollment = await Enrollment.findOneAndUpdate(
      { user: req.user.id, courseId, paymentStatus: 'pending' },
      {
        paymentId: 'test_payment_' + Date.now(),
        paymentSignature: 'test_signature',
        paymentStatus: 'captured',
        paymentMethod: 'test',
        status: 'active'
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: 'Test payment verified successfully',
      enrollment
    });
  } catch (error) {
    console.error('Test verification failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;