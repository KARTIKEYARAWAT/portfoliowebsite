import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: '' },
  level: { type: Number, min: 1, max: 100, default: 80 },
  order: { type: Number, default: 0 },
});

export default mongoose.model('Skill', skillSchema);
