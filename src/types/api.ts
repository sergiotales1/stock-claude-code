/**
 * TypeScript types for API responses
 */

// Product data structure as returned from the database
export interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
}

// API response for products endpoint
export interface ProductsResponse {
  products: Product[];
}

// Generic API error response structure
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// Success response wrapper
export interface ApiSuccessResponse<T> {
  data: T;
  success: true;
}

// Error response wrapper
export interface ApiErrorWrapper {
  error: ApiErrorResponse;
  success: false;
}

// Union type for all API responses
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorWrapper;

// Specific response type for products endpoint
export type ProductsApiResponse = ApiResponse<Product[]>;