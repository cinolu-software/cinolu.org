import { ENVIRONMENT_INITIALIZER, Provider } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';

export const provideAuth = (): Provider => {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: (authService: AuthService) => {
      return () => firstValueFrom(authService.getProfile().pipe(defaultIfEmpty(null)));
    },
    deps: [AuthService]
  };
};
