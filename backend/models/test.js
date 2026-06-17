import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['paid', 'free', 'weekly'], required: true },
  price: { type: Number, default: 0 },
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // index of correct option
    marks: { type: Number, default: 1 },
    negativeMarks: { type: Number, default: 0 }
  }],
  instructions: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Test = mongoose.models.Test || mongoose.model('Test', testSchema);
export default Test;