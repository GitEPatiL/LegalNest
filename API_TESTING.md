# API Testing Commands

## Backend Health Check
```bash
curl http://localhost:5000/health
```

## Test Contact Form Submission
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+919876543210",
    "message": "This is a test contact message"
  }'
```

## Test Enquiry Form Submission
```bash
curl -X POST http://localhost:5000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "customer@example.com",
    "phone": "+919876543210",
    "service": "GST Registration",
    "details": "I need help with GST registration for my startup"
  }'
```

## Get All Services
```bash
curl http://localhost:5000/api/services
```

## Get Service by Slug
```bash
curl http://localhost:5000/api/services/gst-registration
```

## Expected Responses

### Success Response (Contact/Enquiry)
```json
{
  "success": true,
  "message": "Contact message received successfully",
  "id": "67890abc..."
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

### Services Response
```json
{
  "success": true,
  "count": 30,
  "data": [...]
}
```

## Windows PowerShell Alternative

If curl doesn't work, use PowerShell:

```powershell
# Test Contact Form
Invoke-RestMethod -Uri "http://localhost:5000/api/contact" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"Test","email":"t@example.com","phone":"999","message":"hi"}'

# Get Services
Invoke-RestMethod -Uri "http://localhost:5000/api/services" -Method GET
```

## Setup Instructions

### 1. Start Backend
```bash
cd backend
npm install  # First time only
npm run dev
```

Expected output:
```
[INFO] ✅ MongoDB connected successfully
[INFO] 🚀 Server running on port 5000 in development mode
[INFO] 📡 API available at http://localhost:5000/api
```

### 2. Start Frontend
```bash
cd frontend
npm install  # First time only
npm run dev
```

Expected output:
```
✓ Ready in 2.3s
- Local:        http://localhost:3000
```

### 3. Configure Environment

**Frontend** (`/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Backend** (`/backend/.env`):
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

## Testing the Full Flow

1. Open browser: `http://localhost:3000`
2. Navigate to Contact page: `http://localhost:3000/contact-us`
3. Fill the contact form
4. Submit and check:
   - Frontend shows success message
   - Backend console shows log
   - Email notification sent (if SMTP configured)

## Troubleshooting

### CORS Error
Make sure backend `.env` has:
```env
ALLOWED_ORIGINS=http://localhost:3000
```

### Connection Refused
- Check both servers are running
- Verify ports 3000 and 5000 are not blocked

### Email Not Sending
- Email service is optional
- Check backend logs for warnings
- Configure SMTP credentials in backend `.env`

### In-Memory Mode
If you see:
```
[WARN] ⚠️  No valid DB_URI provided. Using in-memory storage.
```
This is normal - data will work but won't persist on restart.
