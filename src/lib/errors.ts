import { ApiErrorResponse } from '../types/api';

/**
 * Error handling utilities for the application
 */

// Custom error classes
export class DatabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Error status codes mapping
export const ERROR_STATUS_CODES = {
  DATABASE_ERROR: 500,
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// User-facing error messages (safe to expose)
export const ERROR_MESSAGES = {
  DATABASE_CONNECTION: 'Unable to connect to database. Please try again later.',
  INVALID_REQUEST: 'Invalid request format or parameters.',
  NOT_FOUND: 'The requested resource was not found.',
  INTERNAL_ERROR: 'An internal error occurred. Please try again later.',
} as const;

/**
 * Creates a standardized API error response
 */
export function createApiErrorResponse(
  statusCode: number,
  message: string,
  error?: string
): ApiErrorResponse {
  return {
    error: error || 'API_ERROR',
    message,
    statusCode,
  };
}

/**
 * Handles database connection errors
 */
export function handleDatabaseError(error: unknown): Response {
  console.error('Database error:', error);

  const errorResponse = createApiErrorResponse(
    ERROR_STATUS_CODES.DATABASE_ERROR,
    ERROR_MESSAGES.DATABASE_CONNECTION,
    'DATABASE_ERROR'
  );

  return Response.json(errorResponse, {
    status: ERROR_STATUS_CODES.DATABASE_ERROR
  });
}

/**
 * Handles validation errors
 */
export function handleValidationError(message?: string): Response {
  const errorResponse = createApiErrorResponse(
    ERROR_STATUS_CODES.VALIDATION_ERROR,
    message || ERROR_MESSAGES.INVALID_REQUEST,
    'VALIDATION_ERROR'
  );

  return Response.json(errorResponse, {
    status: ERROR_STATUS_CODES.VALIDATION_ERROR
  });
}

/**
 * Handles not found errors
 */
export function handleNotFoundError(message?: string): Response {
  const errorResponse = createApiErrorResponse(
    ERROR_STATUS_CODES.NOT_FOUND,
    message || ERROR_MESSAGES.NOT_FOUND,
    'NOT_FOUND'
  );

  return Response.json(errorResponse, {
    status: ERROR_STATUS_CODES.NOT_FOUND
  });
}

/**
 * Generic error handler that categorizes and handles unknown errors
 */
export function handleUnknownError(error: unknown): Response {
  console.error('Unexpected error:', error);

  // Check if it's one of our custom errors
  if (error instanceof DatabaseError) {
    return handleDatabaseError(error.originalError);
  }

  if (error instanceof ValidationError) {
    return handleValidationError(error.message);
  }

  if (error instanceof NotFoundError) {
    return handleNotFoundError(error.message);
  }

  // Default to internal server error
  const errorResponse = createApiErrorResponse(
    ERROR_STATUS_CODES.INTERNAL_ERROR,
    ERROR_MESSAGES.INTERNAL_ERROR,
    'INTERNAL_ERROR'
  );

  return Response.json(errorResponse, {
    status: ERROR_STATUS_CODES.INTERNAL_ERROR
  });
}

/**
 * Returns a successful empty result (for when no products are found)
 */
export function handleEmptyResult<T>(data: T[]): Response {
  return Response.json(data, { status: 200 });
}