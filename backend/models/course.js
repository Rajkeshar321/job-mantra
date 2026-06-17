import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // SSC, Banking, Railway, etc.
  type: { type: String, enum: ['paid', 'free', 'live'], required: true },
  price: { type: Number, default: 0 },
  discountPrice: { type: Number },
  thumbnail: { type: String },
  instructor: { type: String, required: true },
  duration: { type: String },
  videos: [{
    title: String,
    url: String,
    duration: String,
    isFree: { type: Boolean, default: false }
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, default: 0 },
  reviews: [{ user: String, comment: String, rating: Number }],
  syllabus: [{ topic: String, duration: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ FIXED: Check if model already exists before creating
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;