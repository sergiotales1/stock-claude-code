# Stock Management System (Next.js + TailwindCSS)

## Tech Stack

- Next.js (latest, App Router)
- TailwindCSS (latest)
- SQLite (via Prisma or Drizzle ORM – whichever is simplest)
- No authentication needed for now

---

## Pages & Features

### Landing Page (`/`)

- **Hero section** with a short headline and a button linking to the dashboard (`/dashboard`).
- **Advantages section**: highlight 3–4 reasons to use the system.
- **Carousel section**: show some stock items (e.g. product name, image, quantity).

### Dashboard (`/dashboard`)

- **Product Management**
  - Create new products (name, description, quantity, image URL).
  - View all products in a table or grid.
  - Update product details (edit name, description, quantity, image URL).
  - Delete products.
- All CRUD operations should connect to SQLite.

---

## Database Schema (Initial Idea)

- **Product**
  - id (integer, primary key, autoincrement)
  - name (string)
  - description (text, optional)
  - quantity (integer)
  - imageUrl (string, optional)
  - createdAt (datetime)
  - updatedAt (datetime)

---

## Styling

- Use TailwindCSS for styling.
- Keep it minimal, modern, responsive.

---

## Notes

- Keep the codebase simple and beginner-friendly.
- Use components where it makes sense (Hero, Advantages, Carousel, ProductTable, ProductForm).
- No authentication required at this stage.
