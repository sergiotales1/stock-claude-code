---
name: Integrate product display into existing page.tsx
status: todo
created: 2025-09-14T18:08:10Z
epic: landing-page-render-stock-items
estimated_hours: 2-3
priority: medium
depends_on: [3-task, 4-task]
github: 5
---

# Task: Landing Page Integration

## Description

Integrate the product display system into the existing `src/app/page.tsx` file by adding server-side data fetching and client-side interactivity. Maintain the existing page structure while adding the new product display functionality.

## Acceptance Criteria

- [ ] Modify existing `src/app/page.tsx` to include product display
- [ ] Implement server-side data fetching using Next.js App Router patterns
- [ ] Add client-side search state management
- [ ] Preserve existing page layout and branding elements
- [ ] Ensure proper separation between Server and Client Components
- [ ] Handle data fetching errors gracefully
- [ ] Maintain existing meta data and page structure

## Implementation Notes

### Server Component Integration
```typescript
// src/app/page.tsx - Server Component portion
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: 'no-store' // or appropriate cache strategy
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('Product fetch error:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main>
      {/* Existing page content */}
      <ProductDisplaySection initialProducts={products} />
    </main>
  );
}
```

### Client Component for Interactivity
```typescript
// src/components/ProductDisplaySection.tsx - Client Component
'use client';
interface ProductDisplaySectionProps {
  initialProducts: Product[];
}
```

### Integration Strategy

1. **Preserve Existing Content**: Keep current Next.js branding and layout
2. **Add Product Section**: Insert product display below existing content
3. **Server-Side Rendering**: Fetch initial product data at page load
4. **Client-Side Interactivity**: Search functionality using client components
5. **Error Boundaries**: Wrap product section to prevent page-wide failures

### Environment Configuration

- Set up `NEXT_PUBLIC_BASE_URL` environment variable for API calls
- Handle both development and production URL configurations
- Ensure proper error handling for network failures

### Layout Considerations

- Position product display logically within existing page flow
- Maintain existing spacing and visual hierarchy
- Add section headings and descriptive content
- Ensure mobile-first responsive behavior

## Dependencies

- Task 01: Products API endpoint must be functional
- Task 02: Core components must be implemented
- Existing page.tsx structure and styling
- Environment configuration for API URLs

## Testing Requirements

- Page loads successfully with product data
- Search functionality works as expected
- Server-side rendering delivers initial data
- Client-side interactivity functions properly
- Error states don't break existing page functionality
- SEO and meta data remain intact

## Definition of Done

- Product display integrated into existing page.tsx
- Server-side data fetching implemented
- Client-side search functionality working
- Existing page content and functionality preserved
- Error handling prevents page-wide failures
- Manual testing confirms integration success