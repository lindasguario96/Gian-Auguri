# 🎁 Happy Birthday Gian!

An interactive birthday gift reveal application built with React, Vite, and Tailwind CSS.

## Features

- ✨ Animated gift reveal buttons
- 🎉 Confetti animation on full reveal
- 📱 Fully responsive design
- 🎨 Beautiful gradient and shadow effects
- ⚡ Built with Vite for fast development

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Connect your GitHub repository to Netlify and set:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repository name as `base`:
```javascript
export default defineConfig({
  base: '/Gian-Auguri/',
  // ... rest of config
})
```

2. Build and push:
```bash
npm run build
git add dist/
git commit -m "build: production ready"
git push
```

## Technologies Used

- React 18
- Vite 5
- Tailwind CSS 3
- Canvas API (for confetti)

## License

Personal project - All rights reserved ©2026
