import 'dotenv/config';
import mongoose from 'mongoose';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Experience from './models/Experience.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with real-time inventory, Stripe payment integration, user authentication, and an admin dashboard for product and order management.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Tailwind CSS'],
    featured: true,
    order: 1,
    links: { live: 'https://example.com', github: 'https://github.com' },
  },
  {
    title: 'AI Task Manager',
    description: 'A productivity app that uses OpenAI to intelligently categorize and prioritize tasks, suggests optimal scheduling, and provides smart reminders based on user behavior patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI API', 'Prisma', 'tRPC'],
    featured: true,
    order: 2,
    links: { live: 'https://example.com', github: 'https://github.com' },
  },
  {
    title: 'Real-Time Collaboration Tool',
    description: 'A Notion-inspired collaborative workspace with real-time document editing, live cursors, rich text formatting, nested pages, and team permission management.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB', 'Yjs', 'AWS S3'],
    featured: false,
    order: 3,
    links: { live: 'https://example.com', github: 'https://github.com' },
  },
];

const skills = [
  { name: 'React', category: 'Frontend', icon: '⚛️', level: 95, order: 1 },
  { name: 'TypeScript', category: 'Frontend', icon: '🔷', level: 90, order: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', level: 92, order: 3 },
  { name: 'Next.js', category: 'Frontend', icon: '▲', level: 88, order: 4 },
  { name: 'Node.js', category: 'Backend', icon: '🟢', level: 93, order: 5 },
  { name: 'Express', category: 'Backend', icon: '🚂', level: 91, order: 6 },
  { name: 'MongoDB', category: 'Backend', icon: '🍃', level: 87, order: 7 },
  { name: 'PostgreSQL', category: 'Backend', icon: '🐘', level: 82, order: 8 },
  { name: 'Docker', category: 'Tools', icon: '🐳', level: 80, order: 9 },
  { name: 'Git', category: 'Tools', icon: '🔀', level: 95, order: 10 },
  { name: 'AWS', category: 'Tools', icon: '☁️', level: 75, order: 11 },
  { name: 'Figma', category: 'Tools', icon: '🎭', level: 78, order: 12 },
];

const experience = [
  {
    company: 'Nexus Technologies',
    role: 'Senior Full-Stack Engineer',
    startDate: 'Jan 2022',
    endDate: 'Present',
    location: 'San Francisco, CA (Remote)',
    descriptionBullets: [
      'Led development of a microservices architecture serving 500K+ daily active users, improving system reliability by 40%.',
      'Architected and built a real-time analytics dashboard using React, WebSockets, and ClickHouse, reducing data latency from 5 minutes to under 3 seconds.',
      'Mentored a team of 4 junior engineers through code reviews, pair programming, and weekly knowledge-sharing sessions.',
      'Reduced API response times by 60% through strategic caching with Redis and query optimization in PostgreSQL.',
    ],
    order: 1,
  },
  {
    company: 'Vertex Digital',
    role: 'Full-Stack Developer',
    startDate: 'Jun 2020',
    endDate: 'Dec 2021',
    location: 'Austin, TX',
    descriptionBullets: [
      'Built and shipped 12+ client projects ranging from e-commerce platforms to SaaS dashboards using React, Node.js, and MongoDB.',
      'Integrated third-party payment systems (Stripe, PayPal) processing over $2M in transactions monthly.',
      'Implemented CI/CD pipelines with GitHub Actions and Docker, cutting deployment time from 2 hours to 15 minutes.',
      'Collaborated closely with UX designers to translate Figma prototypes into pixel-perfect, responsive interfaces.',
    ],
    order: 2,
  },
  {
    company: 'CodeCraft Studio',
    role: 'Junior Web Developer',
    startDate: 'Aug 2018',
    endDate: 'May 2020',
    location: 'New York, NY',
    descriptionBullets: [
      'Developed responsive marketing websites and landing pages for 20+ clients using React and vanilla JavaScript.',
      'Maintained and improved legacy PHP/WordPress sites, improving page load performance by an average of 35%.',
      'Built RESTful APIs with Node.js and Express to support mobile app features for iOS and Android clients.',
    ],
    order: 3,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    console.log('Cleared existing data');

    await Project.insertMany(projects);
    await Skill.insertMany(skills);
    await Experience.insertMany(experience);
    console.log('Seed data inserted successfully');

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
