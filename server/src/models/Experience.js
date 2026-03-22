import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  location: { type: String, default: '' },
  descriptionBullets: [{ type: String }],
  order: { type: Number, default: 0 },
});

export default mongoose.model('Experience', experienceSchema);
