# LegalNest Backend API

Backend API for the LegalNest Legal Compliance Platform built with Express.js, MongoDB, and Node.js.

## Features

- ✅ RESTful API with Express.js (ES Modules)
- ✅ MongoDB with Mongoose (fallback to in-memory storage)
- ✅ Email notifications with Nodemailer
- ✅ Rate limiting for POST endpoints
- ✅ Input validation and sanitization
- ✅ CORS enabled for frontend
- ✅ Comprehensive error handling
- ✅ Colored console logging

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (optional - uses in-memory storage if not available)
- SMTP credentials (optional - for email notifications)

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/legalnest
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ALLOWED_ORIGINS=http://localhost:3000
```

## Running the Server

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Import Services to Database (optional)
```bash
npm run import:services
```

## API Endpoints

### Health Check
```http
GET /health
```

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "message": "I need help with company registration"
}
```

### Enquiry Form
```http
POST /api/enquiry
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "service": "GST Registration",
  "details": "Need GST registration for my startup"
}
```

### Get All Services
```http
GET /api/services
```

### Get Service by Slug
```http
GET /api/services/gst-registration
```

## Testing with cURL

### 1. Health Check
```bash
curl http://localhost:5000/health
```

### 2. Create Contact
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "message": "This is a test message" 
  }'
```

### 3. Create Enquiry
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "service": "Private Limited Company",
    "details": "Need help with registration"
  }'
```

### 4. Get All Services
```bash
curl http://localhost:5000/api/services
```

### 5. Get Service by Slug
```bash
curl http://localhost:5000/api/services/gst-registration
```

### 6. Get All Contacts (Admin)
```bash
curl http://localhost:5000/api/contact
```

### 7. Get All Enquiries (Admin)
```bash
curl http://localhost:5000/api/enquiry
```

## Project Structure

```
backend/
├── scripts/
│   └── importServices.js      # Import services to MongoDB
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection with fallback
│   │   └── env.js             # Environment configuration
│   ├── controllers/
│   │   ├── contact.controller.js
│   │   ├── enquiry.controller.js
│   │   └── service.controller.js
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── rateLimiter.js     # Rate limiting
│   │   └── validation.js      # Input validation
│   ├── models/
│   │   ├── Contact.js         # Contact schema
│   │   └── Enquiry.js         # Enquiry schema
│   ├── routes/
│   │   ├── contact.routes.js
│   │   ├── enquiry.routes.js
│   │   └── service.routes.js
│   ├── services/
│   │   └── email.service.js   # Email notifications
│   ├── utils/
│   │   └── logger.js          # Colored console logger
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
├── .env.example               # Environment variables template
├── package.json
└── README.md
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed",
  "id": "67890abc...",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]
}
```

## Rate Limiting

POST endpoints are rate-limited to prevent abuse:
- Window: 15 minutes
- Max Requests: 100 per IP

## Database Modes

### MongoDB Mode (Default)
Set `DB_URI` in `.env` to connect to MongoDB

### In-Memory Mode (Fallback)
If no `DB_URI` is provided, the server automatically falls back to in-memory storage. Data will be lost on restart.

## Email Notifications

Configure SMTP settings in `.env` to enable email notifications for:
- Contact form submissions
- Enquiry requests

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation and sanitization
- Error messages sanitized in production

## Development

### Running Tests (Placeholder)
```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Set up MongoDB Atlas or local MongoDB
4. Configure SMTP for emails
5. Set up reverse proxy (nginx)

## License

ISC
