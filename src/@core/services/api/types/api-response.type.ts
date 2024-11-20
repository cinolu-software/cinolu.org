export interface IAPIResponse<T> {
  isLoading: boolean;
  data: T | null;
  error: string | null;
}
