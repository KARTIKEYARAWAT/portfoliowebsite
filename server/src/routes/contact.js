import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';

const router = Router();

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

router.post('/', limiter, validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message received! I\'ll get back to you soon.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
