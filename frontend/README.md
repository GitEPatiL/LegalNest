# LegalNest - Legal Compliance Platform

A production-grade Next.js application for legal compliance services.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Package Manager**: npm

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
 ├─ app/                  # Next.js App Router pages
 │   ├─ layout.jsx        # Root layout with Header/Footer
 │   ├─ page.jsx          # Home page
 │   ├─ globals.css       # Global styles
 │   └─ components/       # UI components
 ├─ config/               # Configuration files
 ├─ data/                 # Static data (JSON)
 ├─ lib/                  # Utility functions
 ├─ styles/               # Theme and custom styles
 └─ pages/api/            # API routes
/public
 └─ assets/               # Static assets
```

## Theme

The project uses a yellow and black color scheme:
- Primary: Yellow (#f59e0b)
- Dark: Black (#1a1a1a)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

## Next Steps

1. Implement component UIs
2. Add pages for services
3. Configure email service for contact forms
4. Add content and assets
