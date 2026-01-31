# MyMarzi — Tour & Travel Website

A dynamic tour and travel website built with **Next.js**, where all content — tour packages, destinations, pricing, and itineraries — is managed entirely through **Google Sheets**. No backend. No admin panel. No code changes needed to update the site.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)
![SheetDB](https://img.shields.io/badge/SheetDB-API-green?style=flat-square)

---

## Overview

Most small travel businesses struggle to keep their websites updated. Hiring a developer every time something changes isn't practical.

**MyMarzi solves this.** The business owner manages all website content — packages, destinations, pricing, itineraries — directly in a Google Sheet. The website fetches that data automatically and stays up to date without any developer involvement.

---

## How It Works

```
Google Sheets  →  SheetDB API  →  Next.js App  →  Live Website
   (source)       (converts to      (fetches &       (users
  of truth)        REST API)        renders)         see it)
```

1. The business owner edits tour data in Google Sheets
2. SheetDB converts the sheet into a REST API
3. Next.js fetches the data and renders fast, SEO-friendly pages
4. The website updates automatically — no redeployment needed

---

## Features

- **Dynamic Tour Packages** — Add, edit, or remove packages directly from Google Sheets
- **Destination Pages** — Each destination has its own page with a list of available packages
- **Multi-Day Itineraries** — Day-by-day breakdowns with expandable accordion sections
- **Inclusions & Exclusions** — Clearly listed for every package
- **Booking & Contact Forms** — Form submissions are saved back to Google Sheets
- **WhatsApp Integration** — Floating WhatsApp button for instant client communication
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Error Handling** — Custom branded error pages with contact options if the API is unavailable
- **SEO-Friendly** — Server-side rendered pages with Next.js for better search engine visibility
- **7-Day Caching** — Reduces API calls and keeps the site fast

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework & server-side rendering |
| React 19 | UI component library |
| Tailwind CSS | Utility-first styling |
| Google Sheets | Content management (source of truth) |
| SheetDB | Converts Google Sheets into a REST API |
| Vercel | Hosting & deployment |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/          # Form submission API route
│   ├── destination/
│   │   └── [name]/page.js    # Dynamic destination pages
│   ├── packages/
│   │   └── [id]/page.js      # Dynamic package detail pages
│   ├── error.js              # Custom error page
│   ├── layout.js             # Root layout (navbar, WhatsApp button)
│   └── page.js               # Homepage
├── components/
│   ├── AboutSection.jsx
│   ├── BookingForm.jsx
│   ├── ContactForm.jsx
│   ├── CTASection.jsx
│   ├── DestinationCarousel.jsx
│   ├── DestinationHero.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── PackageContent.jsx
│   ├── PackageHero.jsx
│   ├── PackagesList.jsx
│   ├── PopularDestinations.jsx
│   ├── Testimonials.jsx
│   └── ValueProposition.jsx
└── lib/
    └── sheetdb.js            # All SheetDB API calls & data fetching
```

---

## Google Sheets Structure

The following sheets are used to power the website:

| Sheet | Purpose |
|---|---|
| `destinations` | List of all destinations (name, slug, image, description) |
| `packages` | Tour packages with pricing, days/nights, hero image |
| `itinerary` | Day-by-day breakdown for each package |
| `inclusions` | What's included in each package |
| `exclusions` | What's not included in each package |
| `policies` | Booking and cancellation policies per package |
| `leads` | Stores contact form submissions |

---

## Getting Started

### Prerequisites

- Node.js (18 or above)
- npm
- A Google Sheet set up with the structure above
- A SheetDB account with your sheet connected

### Installation

```bash
git clone <repository-url>
cd my-marzi
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
SHEETDB_TOKEN=your_sheetdb_token_here
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build & Deploy

```bash
npm run build
npm start
```

Or deploy directly to **Vercel** by connecting your GitHub repository.

---

## Deployment

This project is deployed on **Vercel** and connected to a GitHub repository. Any push to the `main` branch triggers an automatic deployment.

- **Live Site:** [my-marzi.vercel.app](https://my-marzi.vercel.app)

---

## Author

**Shourya Kashyap**

Built as a real-world project for a scalable, content-managed travel website.
