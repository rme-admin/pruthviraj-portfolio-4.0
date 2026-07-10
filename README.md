# Pruthviraj B — Portfolio

Next.js portfolio for research, clean energy, and full-stack engineering work — with admin content management.

## Features

- **Single-page layout** — Hero, About, Experience, Projects, Education, Achievements, References, Gallery, Contact
- **Hydrogen H₂ animation** — rising molecules in the hero background
- **Light / dark theme** toggle
- **Letter-by-letter name animation** with blinking cursor
- **Slide-in mobile menu**
- **Detail pages** — `/projects/[id]`, `/achievements/[id]`, `/media/[id]` with images
- **Admin panel** — manage all content via `/admin/login`

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Copy `.env.example` to `.env.local` and set admin credentials:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-random-secret
```

## Content

JSON files in `src/data/`:

- `site.json` — hero, about, contact
- `projects.json`, `experience.json`, `achievements.json`
- `education.json`, `references.json`, `media.json`

Or edit via **Admin → Site Settings / Projects / Media / …**

## Admin

- URL: `/admin/login`
- Manage hero text, projects (with cover + gallery images), gallery blocks, experience, and more

## Deploy

Requires Node.js (API routes + JSON file writes). Suitable for Vercel, Railway, or any Next.js host.
