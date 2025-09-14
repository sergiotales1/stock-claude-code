---
name: landing-page-render-stock-items
status: backlog
created: 2025-09-14T18:08:10Z
progress: 0%
prd: .claude/prds/landing-page-render-stock-items.md
github: 2
---

# Epic: Landing Page Render Stock Items

## Overview

Implement a product display system on the landing page using existing Next.js/React infrastructure. Leverage the current Prisma Product model to fetch and display inventory items in a responsive grid with client-side search functionality. Focus on minimal code changes by extending the existing page.tsx rather than creating complex new architecture.

## Architecture Decisions

- **Component Strategy**: Extend existing `src/app/page.tsx` with product display components
- **Data Fetching**: Use Next.js App Router with Server Components for initial data load, Client Components for search interactivity
- **State Management**: React useState for search filtering - no external state management needed
- **API Design**: Create single `/api/products` GET endpoint using existing Prisma client
- **Styling**: Leverage existing Tailwind CSS v4 configuration and design tokens
- **Performance**: Server-side data fetching + client-side filtering for optimal UX

## Technical Approach

### Frontend Components
- **ProductGrid**: Container component handling layout and search state
- **ProductCard**: Reusable card component for individual products
- **SearchBar**: Input component with real-time filtering
- **LoadingState**: Simple skeleton/spinner component
- Integrate directly into existing `src/app/page.tsx` to minimize architectural changes

### Backend Services
- **API Route**: `/api/products` - single GET endpoint returning all products
- **Data Layer**: Use existing Prisma client instance to query Product model
- **Response Format**: JSON array of products with id, name, description, quantity, imageUrl fields

### Infrastructure
- **No additional infrastructure needed** - uses existing Next.js app structure
- **Image Loading**: External URLs with Next.js Image component optimization
- **Database**: Existing SQLite + Prisma setup, no schema changes required

## Implementation Strategy

**Development Approach**: Single-phase implementation focusing on core functionality
**Risk Mitigation**:
- Use existing design tokens to ensure visual consistency
- Implement graceful degradation for missing images
- Add error boundaries for failed API calls
**Testing Approach**: Manual testing across device sizes, basic accessibility validation

## Task Breakdown

The following 8 detailed task files have been created for this epic:

- [x] **01-task.md**: Create products API endpoint with Prisma integration (2-3 hours, High Priority)
- [x] **02-task.md**: Build ProductGrid, ProductCard, and SearchBar components (4-6 hours, High Priority)
- [x] **03-task.md**: Integrate product display into existing page.tsx (2-3 hours, Medium Priority)
- [x] **04-task.md**: Implement responsive grid layout with Tailwind (2-3 hours, Medium Priority)
- [x] **05-task.md**: Add client-side filtering by product name (2 hours, Medium Priority)
- [x] **06-task.md**: Handle API failures and loading states gracefully (2 hours, Medium Priority)
- [x] **07-task.md**: Add image lazy loading and basic performance checks (1-2 hours, Low Priority)
- [x] **08-task.md**: Cross-device testing and basic accessibility validation (1-2 hours, Low Priority)

**Total Estimated Effort**: 16-21 hours across 8 focused tasks

Each task file includes detailed acceptance criteria, implementation notes, dependencies, testing requirements, and definition of done criteria.

## Dependencies

**External Dependencies**:
- External image URLs must be accessible (graceful fallback for broken images)

**Internal Dependencies**:
- Existing Prisma client configuration
- Current Tailwind CSS v4 setup
- Next.js App Router architecture

**Prerequisite Work**: None - all required infrastructure exists

## Success Criteria (Technical)

**Performance Benchmarks**:
- API response time < 500ms for product fetch
- Client-side search filtering < 100ms response time
- Image lazy loading prevents render blocking

**Quality Gates**:
- All products from database display correctly
- Search functionality works across all product names
- Responsive design functions on mobile/tablet/desktop
- No console errors on page load

**Acceptance Criteria**:
- Products display in responsive grid (1/2-3/4+ columns by screen size)
- Search bar filters results in real-time
- Loading and error states display appropriately
- Images maintain aspect ratios across devices

## Estimated Effort

**Overall Timeline**: 1-2 development days
**Resource Requirements**: 1 developer
**Critical Path Items**:
1. API endpoint creation (2-3 hours)
2. Component development (4-6 hours)
3. Integration and styling (2-3 hours)
4. Testing and refinement (1-2 hours)

**Total Effort**: 9-14 hours of focused development time