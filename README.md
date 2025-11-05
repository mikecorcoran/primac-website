# Primac Reliability Consultants Website

Landing site for Primac Reliability Consultants built with Next.js (App Router) and Tailwind CSS.

## Framework & Styling Versions
- **Next.js**: 16.0.1 — confirmed via npm registry query (`npm view next version`) on 2025-11-05.
- **Tailwind CSS**: 4.1.16 — confirmed via npm registry query (`npm view tailwindcss version`) on 2025-11-05.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
   The site is available at [http://localhost:3000](http://localhost:3000).
3. Lint the project:
   ```bash
   npm run lint
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Start the production build locally:
   ```bash
   npm run start
   ```

## Project Structure Highlights
```
public/
  icons/           # File-based SVG icons for UI components
  images/          # Photography used across the site
  logos/           # Greyscale certification placeholders
src/
  app/
    (site)/        # Marketing site routes, components, and content
      components/  # UI primitives (Button, Card, Container, etc.)
      content/     # JSON copy for the landing page
      *.tsx        # Page implementations for sitemap entries
    layout.tsx     # Root layout importing global styles
  lib/
    motion.ts      # Motion helpers (IntersectionObserver-based reveal)
  styles/
    globals.css    # Tailwind configuration, tokens, and global styles
```

## Content & Theming
- Palette follows the provided specification (Steel Blue, Safety Orange, Teal accent, Graphite text, Light Gray surfaces).
- Typography uses Inter with system fallbacks, sized for 16–18px body text and a tight heading hierarchy.
- Home page content is data-driven via `src/app/(site)/content/home.json` for easy copy updates.
- SVG icons are stored in `/public/icons` and consumed via `<Image>` components.

## Motion & Accessibility
- Reveal animations are implemented with a lightweight IntersectionObserver helper (`src/lib/motion.ts`) that respects `prefers-reduced-motion`.
- Interactive elements include focus outlines, accessible labels, and consistent hover transitions (≤5px lift, 200–300 ms duration).

## Deployment
The project is ready for deployment on Vercel. Connect the repository to Vercel, ensure environment variables are configured if future integrations require them, and each push to the main branch will trigger a production build.
