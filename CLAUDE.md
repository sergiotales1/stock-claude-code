# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.3 application built with React 19, TypeScript, and Tailwind CSS v4. The project uses the App Router architecture and is currently a fresh create-next-app template.

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global CSS with Tailwind imports and CSS custom properties
- `public/` - Static assets (SVG icons for Next.js branding)
- Root configuration files for Next.js, TypeScript, ESLint, PostCSS, and Tailwind

## Development Commands

```bash
# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Start production server
npm start
# or
pnpm start

# Run ESLint
npm run lint
# or
pnpm lint
```

## Key Configuration

- **TypeScript**: Configured with Next.js plugin and path aliases (`@/*` maps to `./src/*`)
- **ESLint**: Uses Next.js core-web-vitals and TypeScript configs with FlatCompat for compatibility
- **Tailwind CSS**: v4 with PostCSS integration, uses CSS custom properties for theming
- **Fonts**: Geist Sans and Geist Mono from next/font/google

## Styling System

The application uses Tailwind CSS v4 with a custom theme system:
- CSS custom properties for colors (`--background`, `--foreground`)
- Dark mode support via `prefers-color-scheme`
- Geist font variables integrated into Tailwind config
- Global styles in `src/app/globals.css`

## Architecture Notes

- Uses Next.js App Router (not Pages Router)
- TypeScript with strict mode enabled
- No custom components or utilities yet - currently default template
- Static assets in `/public` directory
- Source code organized under `/src` directory