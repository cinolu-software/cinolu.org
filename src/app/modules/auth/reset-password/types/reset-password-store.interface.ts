import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';

export interface IResetPasswordStore {
  isLoading: boolean;
  error: string;
  errors: IAPIValidationError[];
}
