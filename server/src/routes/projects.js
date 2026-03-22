import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Project from '../models/Project.js';

const router = Router();

const limiter = rateLimit({ windowMs: 60 * 1000, max: 60 });

router.get('/', limiter, async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
