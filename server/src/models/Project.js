import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  techStack: [{ type: String }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  links: {
    live: { type: String, default: '' },
    github: { type: String, default: '' },
  },
});

export default mongoose.model('Project', projectSchema);
