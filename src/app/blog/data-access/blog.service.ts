import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';

@Injectable()
export class BlogService {
  #apiService = inject(APIService);
}
