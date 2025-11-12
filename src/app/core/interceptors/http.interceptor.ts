import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.url.startsWith('assets/') || req.url.startsWith('/assets/')) {
    return next(req);
  }

  const newReq: HttpRequest<unknown> = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true
  });
  return next(newReq);
};
