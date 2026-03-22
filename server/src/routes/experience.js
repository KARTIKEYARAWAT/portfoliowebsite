import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Experience from '../models/Experience.js';

const router = Router();

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });

router.get('/', limiter, async (_req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
