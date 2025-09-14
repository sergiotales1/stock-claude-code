---
name: Handle API failures and loading states gracefully
status: todo
created: 2025-09-14T18:08:10Z
epic: landing-page-render-stock-items
estimated_hours: 2
priority: medium
depends_on: [3-task, 5-task]
github: 8
---

# Task: Error & Loading States Implementation

## Description

Implement comprehensive error handling and loading states for the product display system. Ensure graceful degradation when API calls fail and provide clear feedback to users during data fetching operations.

## Acceptance Criteria

- [ ] Loading skeleton/spinner during initial product fetch
- [ ] Error boundary component to catch React errors
- [ ] API failure handling with retry mechanism
- [ ] Network connectivity error detection
- [ ] Graceful fallback for missing product images
- [ ] User-friendly error messages (no technical jargon)
- [ ] Loading states for search operations
- [ ] Offline state detection and messaging

## Implementation Notes

### Loading States

#### Initial Page Load
```typescript
// src/components/ProductDisplaySection.tsx
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 w-full rounded-t-lg"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);
```

#### Grid Loading State
```jsx
{isLoading ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array(8).fill(0).map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
) : (
  <ProductGrid products={filteredProducts} searchTerm={searchTerm} />
)}
```

### Error Boundary Implementation

#### React Error Boundary
```typescript
// src/components/ProductErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ProductErrorBoundary extends Component<
  PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Product display error:', error, errorInfo);
    // Optional: Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ProductErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}
```

#### Error Fallback UI
```tsx
const ProductErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center py-12 px-4">
    <div className="max-w-md mx-auto">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">
        We're having trouble loading the products. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  </div>
);
```

### API Error Handling

#### Retry Mechanism
```typescript
// src/utils/api.ts
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;

      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status}`);
      }

      throw new Error(`Server error: ${response.status}`);
    } catch (error) {
      lastError = error as Error;

      if (i < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }

  throw lastError!;
}
```

#### Network Status Detection
```typescript
// src/hooks/useNetworkStatus.ts
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

### Image Error Handling

#### Fallback Image System
```typescript
// src/components/ProductCard.tsx
const [imageError, setImageError] = useState(false);
const [imageLoading, setImageLoading] = useState(true);

<Image
  src={imageError ? '/fallback-product.jpg' : (product.imageUrl || '/placeholder-product.jpg')}
  alt={product.name}
  width={300}
  height={200}
  className="w-full h-48 object-cover rounded-t-lg"
  onError={() => setImageError(true)}
  onLoad={() => setImageLoading(false)}
/>

{imageLoading && (
  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-lg" />
)}
```

### User-Friendly Error Messages

#### Error Message Mapping
```typescript
// src/utils/errorMessages.ts
export function getErrorMessage(error: Error | string): string {
  const errorString = typeof error === 'string' ? error : error.message;

  if (errorString.includes('Failed to fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  if (errorString.includes('500')) {
    return 'Our servers are currently experiencing issues. Please try again in a few minutes.';
  }

  if (errorString.includes('404')) {
    return 'The requested information could not be found.';
  }

  return 'An unexpected error occurred. Please try refreshing the page.';
}
```

## Dependencies

- Task 01: API endpoint for error simulation
- Task 03: Client-side component structure
- React Error Boundary API
- Next.js Image component for image error handling

## Testing Requirements

### Error Simulation
- Network disconnection during page load
- API endpoint returning 500 errors
- Malformed JSON responses
- Broken image URLs
- JavaScript runtime errors in components

### Loading State Testing
- Slow network conditions
- Large product datasets
- Search operations with delays
- Image loading performance

### User Experience Testing
- Error messages are user-friendly
- Retry mechanisms work correctly
- Loading states provide appropriate feedback
- Offline detection functions properly

## Definition of Done

- Loading skeletons display during data fetching
- Error boundary catches and handles React errors
- API failures are handled gracefully with retry logic
- Image loading errors show appropriate fallbacks
- User-friendly error messages replace technical errors
- Network status detection works properly
- All error scenarios tested and handled appropriately