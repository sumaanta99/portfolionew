# Sumaanta Munde — Portfolio

Personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Medium RSS integration**.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom design tokens
- **Blog**: Medium RSS auto-sync (no CMS, no backend)
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
```

## Project Structure

```
├── app/
│   ├── page.tsx          # Home (Hero, Stats, Experience, Blog preview)
│   ├── about/page.tsx    # Full résumé
│   ├── blog/page.tsx     # Blog listing (Medium RSS)
│   └── layout.tsx        # Root layout
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── BlogCard.tsx
├── data/
│   └── resume.ts         # ← Edit your info here
└── lib/
    └── medium.ts         # Medium RSS fetcher
```

## Updating Your Info

All personal data lives in `data/resume.ts`. Edit:
- `personal` — name, email, LinkedIn, summary
- `experiences` — work history with bullet points
- `skills` — grouped skill categories
- `stats` — your highlight numbers

## Medium Integration

1. Open `lib/medium.ts`
2. Change `MEDIUM_USERNAME` to your actual Medium handle
3. Done — posts auto-sync every hour via ISR

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com for auto-deploys
```

## Customization

Colors are defined in `tailwind.config.js`:
```js
colors: {
  ink: "#0D0D0D",      // primary text
  paper: "#F5F0E8",    // background
  accent: "#E8572A",   // orange highlights
  muted: "#8A8680",    // secondary text
  subtle: "#E8E3DA",   // borders
}
```
