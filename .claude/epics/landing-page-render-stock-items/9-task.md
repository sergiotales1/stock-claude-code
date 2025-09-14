---
name: Add image lazy loading and basic performance checks
status: todo
created: 2025-09-14T18:08:10Z
epic: landing-page-render-stock-items
estimated_hours: 1-2
priority: low
depends_on: [4-task, 6-task]
github: 9
---

# Task: Performance Optimization

## Description

Implement image lazy loading and basic performance optimizations to ensure the product display system loads efficiently and provides a smooth user experience across all device types and network conditions.

## Acceptance Criteria

- [ ] Image lazy loading prevents render blocking on initial page load
- [ ] Implement intersection observer for progressive image loading
- [ ] Add image preloading for above-the-fold content
- [ ] Optimize bundle size by code splitting if needed
- [ ] Implement basic performance monitoring
- [ ] Ensure Core Web Vitals meet acceptable thresholds
- [ ] Add loading priorities for critical vs non-critical images
- [ ] Memory leak prevention for component unmounting

## Implementation Notes

### Image Lazy Loading

#### Next.js Image Component Optimization
```typescript
// src/components/ProductCard.tsx
import Image from 'next/image';

<Image
  src={product.imageUrl || '/placeholder-product.jpg'}
  alt={product.name}
  width={300}
  height={200}
  className="w-full h-48 object-cover rounded-t-lg"
  loading="lazy"  // Native lazy loading
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  priority={index < 4}  // Prioritize first 4 images
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

#### Custom Intersection Observer Hook
```typescript
// src/hooks/useIntersectionObserver.ts
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}
```

### Progressive Image Loading

#### Skeleton to Image Transition
```typescript
// src/components/ProductCard.tsx
const ProductCard = ({ product, index }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef);

  return (
    <div ref={cardRef} className="bg-white rounded-lg shadow-md overflow-hidden">
      {isVisible && (
        <div className="relative">
          {!imageLoaded && (
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={200}
            className={`w-full h-48 object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        </div>
      )}
    </div>
  );
};
```

### Bundle Size Optimization

#### Dynamic Component Loading
```typescript
// src/components/ProductDisplaySection.tsx
import dynamic from 'next/dynamic';

// Lazy load search functionality for better initial page performance
const SearchBar = dynamic(() => import('./SearchBar'), {
  loading: () => <div className="h-12 bg-gray-100 rounded animate-pulse" />,
  ssr: false
});

// Code splitting for large datasets
const VirtualizedProductGrid = dynamic(() => import('./VirtualizedProductGrid'), {
  loading: () => <ProductGridSkeleton />,
  ssr: false
});
```

### Performance Monitoring

#### Core Web Vitals Tracking
```typescript
// src/utils/performance.ts
export function reportWebVitals(metric: any) {
  const { name, value, id } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${value} (${id})`);
  }

  // Send to analytics service in production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics, Vercel Analytics, etc.
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }
}
```

#### Performance Budget Checks
```typescript
// src/utils/performanceMonitor.ts
export function checkPerformanceBudgets() {
  if (typeof window === 'undefined') return;

  // Monitor bundle size
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        const navEntry = entry as PerformanceNavigationTiming;

        // Check if load time exceeds budget
        if (navEntry.loadEventEnd - navEntry.navigationStart > 3000) {
          console.warn('Page load time exceeds 3s budget');
        }

        // Check if FCP exceeds budget
        if (navEntry.responseStart - navEntry.navigationStart > 1000) {
          console.warn('First Contentful Paint exceeds 1s budget');
        }
      }
    });
  });

  observer.observe({ entryTypes: ['navigation'] });
}
```

### Memory Leak Prevention

#### Component Cleanup
```typescript
// src/components/ProductDisplaySection.tsx
useEffect(() => {
  // Cleanup function for preventing memory leaks
  return () => {
    // Cancel any pending requests
    if (abortController.current) {
      abortController.current.abort();
    }

    // Clear timeouts and intervals
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyboardShortcuts);
  };
}, []);
```

#### Image Loading Optimization
```typescript
// src/hooks/useImagePreloader.ts
export function useImagePreloader(urls: string[]) {
  useEffect(() => {
    const imagePromises = urls.slice(0, 6).map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    });

    Promise.allSettled(imagePromises);
  }, [urls]);
}
```

### Performance Metrics Targets

#### Core Web Vitals Goals
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

#### Custom Metrics
- Initial product grid render: < 500ms
- Search response time: < 100ms
- Image lazy loading effectiveness: > 80% images below fold

## Dependencies

- Task 02: ProductCard component implementation
- Task 04: Responsive grid layout
- Next.js Image component and optimization features
- Performance monitoring tools and APIs

## Testing Requirements

### Performance Testing
- Lighthouse audit scores (Performance > 85)
- WebPageTest analysis for various connection speeds
- Bundle size analysis and monitoring
- Memory usage profiling

### Loading Testing
- Large product datasets (100+ items)
- Slow network simulation (3G, slow 3G)
- Image loading with broken URLs
- Component mounting/unmounting cycles

### Monitoring
- Core Web Vitals measurement in real usage
- Bundle size tracking over time
- Error rate monitoring for image loading
- Search performance metrics

## Definition of Done

- Image lazy loading implemented and functional
- Core Web Vitals meet acceptable thresholds
- Bundle size optimized and monitored
- Performance monitoring implemented
- Memory leaks prevented and tested
- Lighthouse performance score > 85
- Manual testing confirms smooth user experience across devices