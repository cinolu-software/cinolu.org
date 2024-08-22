import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';

export interface IForgotPasswordStore {
  isLoading: boolean;
  error: string;
  errors: IAPIValidationError[];
}
