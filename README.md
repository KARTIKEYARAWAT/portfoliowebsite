# Portfolio Website

A production-ready MERN stack portfolio website with a dark premium design, smooth animations, and a RESTful API backend.

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS 3, Framer Motion, Lucide React  
**Backend:** Node.js, Express 4, MongoDB (Mongoose), express-validator  
**Design:** Dark premium theme with custom Tailwind palette and Framer Motion animations

## Project Structure

```
portfoliowebsite/
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Navbar, Hero, About, Projects, Skills, Experience, Contact
│   │   ├── api.js        # API helper functions
│   │   ├── App.jsx       # Root component
│   │   └── index.css     # Tailwind + custom styles
│   ├── index.html
│   └── tailwind.config.js
├── server/               # Express + MongoDB backend
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express route handlers
│   │   ├── index.js      # App entry point
│   │   └── seed.js       # Database seed script
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm

## Local Development Setup

### 1. Clone and navigate
```bash
git clone <repo-url>
cd portfoliowebsite
```

### 2. Set up the server
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
```

### 3. Set up the client
```bash
cd ../client
cp .env.example .env
npm install
```

### 4. Seed the database
```bash
cd ../server
npm run seed
```

### 5. Start both servers
In separate terminals:
```bash
# Terminal 1 - API server
cd server && npm run dev

# Terminal 2 - React dev server
cd client && npm run dev
```

Visit `http://localhost:5173`

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects (sorted by order) |
| GET | /api/skills | Get all skills (sorted by order) |
| GET | /api/experience | Get all experience entries (sorted by order) |
| POST | /api/contact | Submit contact form |
| GET | /api/health | Health check |

### POST /api/contact
**Body:**
```json
{
  "name": "string (required)",
  "email": "valid email (required)",
  "message": "string, max 2000 chars (required)"
}
```
**Success (201):** `{ "message": "Message received! I'll get back to you soon." }`  
**Validation error (422):** `{ "errors": [{ "msg": "...", "path": "..." }] }`

## Environment Variables

### server/.env
| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| MONGODB_URI | mongodb://localhost:27017/portfolio | MongoDB connection string |
| CLIENT_ORIGIN | http://localhost:5173 | CORS allowed origin |

### client/.env
| Variable | Default | Description |
|----------|---------|-------------|
| VITE_API_BASE_URL | http://localhost:5000 | API base URL |

## Database Seeding

The seed script populates the database with sample data:
```bash
cd server
npm run seed
```

This inserts:
- 3 sample projects with realistic descriptions
- 12 skills across Frontend, Backend, and Tools categories
- 3 work experience entries

## Production Build

### Build the client
```bash
cd client
npm run build
# Output in client/dist/
```

### Serve in production
Configure a reverse proxy (nginx/Caddy) to:
- Serve `client/dist/` as static files
- Proxy `/api/*` requests to the Express server

Or serve the built client from Express:
```js
app.use(express.static('../client/dist'));
```
