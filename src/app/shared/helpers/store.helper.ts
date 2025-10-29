export interface LoadingState {
  isLoading: boolean;
}

export interface DataState<T> extends LoadingState {
  data: T | null;
}

export interface PaginatedState<T> extends LoadingState {
  data: [T[], number];
}

export function createInitialLoadingState<T>(initialData: T): DataState<T> {
  return {
    isLoading: false,
    data: initialData
  };
}

export function createInitialPaginatedState<T>(): PaginatedState<T> {
  return {
    isLoading: false,
    data: [[], 0]
  };
}
