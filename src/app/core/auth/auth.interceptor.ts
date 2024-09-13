import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  let newReq = req.clone();

  if (!req.url.includes('icons')) {
    newReq = req.clone({
      url: environment.apiUrl + req.url,
      headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
    });
  }

  return next(newReq);
};
