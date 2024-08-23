import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';

export interface ISignUpStore {
  isLoading: boolean;
  error: string | null;
  errors: IAPIValidationError[];
}
