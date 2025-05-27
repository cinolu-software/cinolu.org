export interface IAPIResponse<T> {
  isLoading: boolean;
  data: T | null;
  isSuccess: boolean;
}
