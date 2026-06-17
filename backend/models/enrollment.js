import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: Number,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // Payment tracking
  paymentId: {
    type: String,
    default: null
  },
  orderId: {
    type: String,
    default: null
  },
  paymentSignature: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'authorized', 'captured', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    default: null // card, upi, netbanking, wallet, etc.
  },
  // Enrollment status
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'refunded', 'expired'],
    default: 'active'
  },
  // Progress tracking
  progress: {
    type: Number,
    default: 0, // 0-100%
    min: 0,
    max: 100
  },
  completedLectures: [{
    type: Number
  }],
  // Timestamps
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 365 * 24 * 60 * 60 * 1000) // 1 year validity
  },
  completedAt: {
    type: Date,
    default: null
  },
  // Refund tracking
  refundId: {
    type: String,
    default: null
  },
  refundAmount: {
    type: Number,
    default: null
  },
  refundedAt: {
    type: Date,
    default: null
  }
});

// Indexes for faster queries
enrollmentSchema.index({ user: 1, courseId: 1 }, { unique: true }); // Prevent duplicate enrollments
enrollmentSchema.index({ orderId: 1 });
enrollmentSchema.index({ paymentId: 1 });
enrollmentSchema.index({ status: 1 });

// Method to check if enrollment is expired
enrollmentSchema.methods.isExpired = function() {
  return this.expiresAt && new Date() > this.expiresAt;
};

// Method to update progress
enrollmentSchema.methods.updateProgress = function(lectureId) {
  if (!this.completedLectures.includes(lectureId)) {
    this.completedLectures.push(lectureId);
  }
  // Calculate progress based on total lectures (you'll need to pass total)
  return this;
};

// Pre-save middleware to auto-update status if expired
enrollmentSchema.pre('save', function(next) {
  if (this.isExpired() && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;