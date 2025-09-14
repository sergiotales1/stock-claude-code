---
name: Implement responsive grid layout with Tailwind
status: todo
created: 2025-09-14T18:08:10Z
epic: landing-page-render-stock-items
estimated_hours: 2-3
priority: medium
depends_on: [4-task]
github: 6
---

# Task: Styling & Responsiveness

## Description

Implement a fully responsive product grid layout using Tailwind CSS v4 that adapts seamlessly across all device sizes. Leverage existing design tokens and CSS custom properties to maintain visual consistency with the application theme.

## Acceptance Criteria

- [ ] Create responsive grid: 1 column (mobile), 2-3 columns (tablet), 4+ columns (desktop)
- [ ] Use existing Tailwind v4 configuration and CSS custom properties
- [ ] Implement proper spacing and typography hierarchy
- [ ] Add hover states and interactive feedback
- [ ] Ensure consistent card sizing and image aspect ratios
- [ ] Test across all major breakpoints
- [ ] Maintain accessibility standards for interactive elements

## Implementation Notes

### Responsive Grid Configuration

#### Breakpoint Strategy
```css
/* Mobile-first approach */
grid-cols-1           /* Mobile: 320px+ */
sm:grid-cols-2        /* Small: 640px+ */
md:grid-cols-3        /* Medium: 768px+ */
lg:grid-cols-4        /* Large: 1024px+ */
xl:grid-cols-5        /* Extra Large: 1280px+ */
```

#### ProductGrid Styling
```typescript
<div className={`
  grid gap-4 p-4
  grid-cols-1
  sm:grid-cols-2 sm:gap-6
  md:grid-cols-3
  lg:grid-cols-4 lg:gap-8
  xl:grid-cols-5
`}>
```

### ProductCard Design System

#### Card Structure
- Consistent aspect ratios for product images (16:9 or 1:1)
- Proper padding and spacing using design tokens
- Typography hierarchy: product name (larger), description (smaller)
- Quantity display with visual prominence
- Hover effects for interactivity

#### CSS Custom Properties Integration
```css
/* Leverage existing theme variables */
bg-[var(--background)]
text-[var(--foreground)]
border-[var(--border)]
```

### Interactive States

#### Hover Effects
- Subtle card elevation using `hover:shadow-lg`
- Color transitions using existing theme colors
- Scale transforms for visual feedback: `hover:scale-105`

#### Focus States
- Proper keyboard navigation support
- Clear focus indicators using `focus:ring` utilities
- Accessible color contrast ratios

### Typography Integration

#### Font Integration
```typescript
// Use existing Geist font configuration
className={`${geistSans.variable} ${geistMono.variable}`}
```

#### Text Sizing
- Product names: `text-lg font-semibold`
- Descriptions: `text-sm text-gray-600`
- Quantities: `text-xs bg-blue-100 px-2 py-1 rounded`

### Image Optimization

#### Next.js Image Component
```typescript
<Image
  src={product.imageUrl || '/placeholder-product.jpg'}
  alt={product.name}
  width={300}
  height={200}
  className="w-full h-48 object-cover rounded-t-lg"
/>
```

#### Aspect Ratio Maintenance
- Use `aspect-square` or `aspect-video` utilities
- Object-fit utilities: `object-cover`, `object-center`
- Consistent image container sizing

## Dependencies

- Task 02: ProductGrid and ProductCard components
- Existing Tailwind v4 configuration
- CSS custom properties from globals.css
- Next.js Image component for optimization

## Testing Requirements

### Device Testing
- Mobile phones (320px-640px width)
- Tablets (640px-1024px width)
- Desktop screens (1024px+ width)
- Ultra-wide displays (1440px+ width)

### Visual Testing
- Card alignment and spacing consistency
- Image aspect ratio maintenance
- Text readability across all sizes
- Hover and focus state functionality

### Performance Testing
- Image loading performance
- Layout shift prevention
- Responsive behavior smoothness

## Definition of Done

- Responsive grid layout implemented and functional
- All breakpoints tested and working correctly
- Hover and focus states provide proper feedback
- Images maintain consistent aspect ratios
- Typography hierarchy is clear and accessible
- Design integrates seamlessly with existing application theme
- Manual testing completed across all target device sizes