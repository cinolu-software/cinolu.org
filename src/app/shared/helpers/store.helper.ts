/**
 * Generic interface for store state with loading
 */
export interface LoadingState {
  isLoading: boolean;
}

/**
 * Generic interface for store state with data
 */
export interface DataState<T> extends LoadingState {
  data: T | null;
}

/**
 * Generic interface for store state with paginated data
 */
export interface PaginatedState<T> extends LoadingState {
  data: [T[], number];
}

/**
 * Type-safe helper to create initial state with loading
 */
export function createInitialLoadingState<T>(initialData: T): DataState<T> {
  return {
    isLoading: false,
    data: initialData
  };
}

/**
 * Type-safe helper to create initial paginated state
 */
export function createInitialPaginatedState<T>(): PaginatedState<T> {
  return {
    isLoading: false,
    data: [[], 0]
  };
}
