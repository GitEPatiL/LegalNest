# Backend - Node.js/Express API

Backend API for LegalNest Legal Compliance Platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Email**: Nodemailer
- **Validation**: express-validator
- **Security**: Helmet, CORS
- **Rate Limiting**: express-rate-limit

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from example:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
- Database URI
- SMTP credentials
- CORS settings

4. Run development server:
```bash
npm run dev
```

5. Run production:
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Contact
- `POST /api/contact` - Submit contact form

### Enquiry
- `POST /api/enquiry` - Submit service enquiry

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

## Project Structure

```
/backend
 ├── src/
 │   ├── server.js           # Entry point
 │   ├── app.js              # Express app configuration
 │   ├── config/             # Configuration files
 │   │   ├── db.js           # Database connection
 │   │   └── env.js          # Environment variables
 │   ├── routes/             # API routes
 │   ├── controllers/        # Route handlers
 │   ├── models/             # Mongoose models
 │   ├── middleware/         # Custom middleware
 │   ├── services/           # Business logic
 │   └── utils/              # Utility functions
 ├── package.json
 └── .env.example
```

## Environment Variables

See `.env.example` for all required variables.

## Features

- ✅ RESTful API design
- ✅ MongoDB integration
- ✅ Email notifications
- ✅ Input validation
- ✅ Rate limiting
- ✅ Error handling
- ✅ CORS configured
- ✅ Security headers
- ✅ Logging

## Development

The API runs on `http://localhost:5000` by default.

Use Postman or similar tools to test endpoints.
