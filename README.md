# LegalNest - Legal Compliance Platform

A production-ready legal compliance platform with **Next.js 15** frontend and **Express.js** backend API.

🌐 **336 SEO-optimized pages** | 📱 **Mobile-first design** | ⚡ **Lightning fast** | 🎨 **Modern UI**

---

## 📁 Repository Structure

```
LegalNest/
├── frontend/                 # Next.js 15 App (React 19)
│   ├── src/
│   │   ├── app/             # App Router pages & components
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── services/    # Dynamic service pages [slug]
│   │   │   ├── city/        # City-specific pages [city]/[slug]
│   │   │   └── page.jsx     # Homepage
│   │   ├── config/          # Site configuration
│   │   ├── data/            # JSON data (services, cities, menu)
│   │   └── lib/             # Utilities (apiClient, seo, sitemap)
│   ├── scripts/             # Build scripts (sitemap, routes)
│   └── public/              # Static assets
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── config/          # Database & environment config
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic (email)
│   │   ├── middleware/      # Validation, rate limiting
│   │   └── utils/           # Helpers (logger)
│   ├── scripts/             # Data import scripts
│   └── tests/               # API tests
│
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **MongoDB** (local or Atlas)
- **SMTP credentials** (Gmail, SendGrid, etc.)

### 1. Clone & Install

```bash
git clone <repository-url>
cd LegalNest

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Setup

#### Frontend: `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend: `backend/.env`
```env
# Server
PORT=5000
NODE_ENV=development

# Database (optional - uses in-memory if blank)
DB_URI=mongodb://localhost:27017/legalnest
# Or MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/legalnest

# SMTP Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note:** Backend works without database (in-memory storage) and without SMTP (email disabled).

### 3. Run Development Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev
# ✅ Running on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# ✅ Running on http://localhost:3000
```

---

## 🧪 API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Test message"
  }'
```

### Submit Enquiry
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "service": "GST Registration",
    "details": "Need help with GST registration"
  }'
```

### Get Services
```bash
curl http://localhost:5000/api/services
```

### Get Service by Slug
```bash
curl http://localhost:5000/api/services/gst-registration
```

### Postman Collection
Import this JSON into Postman:

```json
{
  "info": { "name": "LegalNest API", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "item": [
    {
      "name": "Health Check",
      "request": { "method": "GET", "url": "{{baseUrl}}/api/health" }
    },
    {
      "name": "Submit Contact",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/contact",
        "header": [{ "key": "Content-Type", "value": "application/json" }],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"phone\": \"1234567890\",\n  \"message\": \"Test message\"\n}"
        }
      }
    }
  ],
  "variable": [{ "key": "baseUrl", "value": "http://localhost:5000" }]
}
```

---

## 📊 Utility Scripts

### Generate Sitemap
```bash
cd frontend
npm run sitemap
# Outputs: public/sitemap.xml
```

### Generate Route Manifest
```bash
cd frontend

# JSON manifest
npm run routes

# CSV export (for bulk review)
npm run routes:csv

# Both formats with stats
npm run routes:all

# Only print URLs
node scripts/generatePages.js --sitemap-only
```

**Output:** `frontend/output/`
- `routes-manifest.json` - All 336 routes with metadata
- `routes-manifest.csv` - Spreadsheet format

---

## 🧪 Integration Testing

### Step 1: Start Both Servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

### Step 2: Test Backend API
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Integration test"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": { "id": "...", "name": "Test User", ... }
}
```

### Step 3: Test Frontend Form
1. Open browser: http://localhost:3000/contact-us
2. Fill out the contact form
3. Submit and verify success message
4. Check backend terminal for POST log

### Step 4: Verify Data
```bash
# Check backend terminal logs
# Should show: POST /api/contact 201

# If using MongoDB, query:
mongosh legalnest --eval "db.contacts.find().pretty()"
```

---

## 🚀 Deployment

### Frontend → Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import Git repository
   - Select `frontend` as root directory

2. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-api.railway.app
   ```

3. **Build Settings**
   ```bash
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Auto-deploys on every push to main

### Backend → Railway / Render

#### Railway:
1. **New Project** → Deploy from GitHub
2. **Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   DB_URI=mongodb+srv://...
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ALLOWED_ORIGINS=https://your-site.vercel.app
   ```
3. **Start Command:** `npm start`
4. Deploy automatically

#### Render:
1. **New Web Service** → Connect repository
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add environment variables (same as above)

### Database → MongoDB Atlas

1. **Create Cluster**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create free M0 cluster

2. **Database User**
   - Database Access → Add user
   - Note username/password

3. **Network Access**
   - Add IP: `0.0.0.0/0` (or specific IPs)

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/legalnest?retryWrites=true&w=majority
   ```

5. **Update Environment**
   - Add to Railway/Render: `DB_URI=<connection-string>`

### Post-Deployment Checklist

- [ ] Update `frontend/.env.local` with production API URL
- [ ] Update `backend/.env` with production DB URI
- [ ] Set `ALLOWED_ORIGINS` to production frontend URL
- [ ] Test contact form on production
- [ ] Verify emails are being sent
- [ ] Submit sitemap to Google Search Console
- [ ] Check all 336 pages are accessible

---

## 📈 SEO & Performance

### Pages Generated
- **6** Static pages (home, about, contact, services, blog, cities)
- **30** Service pages (`/services/[slug]`)
- **300** City-specific pages (`/city/[city]/[slug]`)
- **Total: 336 SEO-optimized pages**

### SEO Features
✅ Unique meta titles & descriptions  
✅ Canonical URLs  
✅ Open Graph tags  
✅ JSON-LD structured data (LegalService schema)  
✅ Sitemap.xml (auto-generated)  
✅ Robots.txt  

### Access SEO Files
- Sitemap: `http://localhost:3000/sitemap.xml`
- Robots: `http://localhost:3000/robots.txt`

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** Client-side validation

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Email:** Nodemailer
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** express-validator

---

## 📚 Documentation

- [Quick Start Guide](./frontend/docs/QUICK_START.md)
- [Components Guide](./frontend/docs/COMPONENTS_GUIDE.md)
- [Backend API](./backend/README.md)
- [SEO Guide](./docs/SEO_GUIDE.md)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

Private - LegalNest Team

---

## 🆘 Support

For issues or questions:
- 📧 Email: support@legalnest.com
- 📱 Phone: +91-XXXXXXXXXX
- 💬 Discord: [Join our community](#)

---

**Built with ❤️ by the LegalNest Team**
