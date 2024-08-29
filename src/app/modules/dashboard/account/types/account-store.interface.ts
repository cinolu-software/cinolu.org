import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';

export interface IAccountStore {
  infoIsLoading: boolean;
  infoError: string | null;
  infoErrors: IAPIValidationError[];
  infoSuccess: string | null;
  securityIsLoading: boolean;
  securityError: string | null;
  securityErrors: IAPIValidationError[];
  securitySuccess: string | null;
}
