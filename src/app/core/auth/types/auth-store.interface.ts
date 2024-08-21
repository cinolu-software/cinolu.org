import { IUser } from 'app/core/types/models.interface';

export interface AuthStoreInterface {
  user: IUser | null;
}
