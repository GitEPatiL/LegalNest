# LegalNest - Monorepo

Production-grade legal compliance platform with separate frontend and backend.

## Project Structure

```
/
├── frontend/          # Next.js App (React)
└── backend/           # Node.js/Express API
```

## Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Opens on http://localhost:3000
```

### Backend (Express API)

```bash
cd backend
npm install
cp .env.example .env   # Configure your environment
npm run dev
# Runs on http://localhost:5000
```

## Documentation

- **Frontend**: See [frontend/README.md](./frontend/README.md)
- **Backend**: See [backend/README.md](./backend/README.md)
- **Config & Theme**: See [frontend/docs/CONFIG_AND_THEME.md](./frontend/docs/CONFIG_AND_THEME.md)

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer

## Environment Setup

1. **Frontend** requires `NEXT_PUBLIC_API_URL` in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

2. **Backend** requires configuration in `.env` (see backend/.env.example)

## Development Workflow

1. Start backend server: `cd backend && npm run dev`
2. Start frontend dev server: `cd frontend && npm run dev`
3. Access app at http://localhost:3000

## Production Deployment

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
npm start
```

## API Integration

Frontend communicates with backend via `apiClient.js`:

```javascript
import { postContact, getServices } from '@/lib/apiClient';

// Submit contact form
await postContact({ name, email, message });

// Fetch services
const services = await getServices();
```

## License

Private - LegalNest Team
