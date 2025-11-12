import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Ne pas modifier les URLs pour les fichiers de traduction (i18n) ou autres assets statiques
  if (req.url.startsWith('assets/') || req.url.startsWith('/assets/')) {
    return next(req);
  }

  const newReq: HttpRequest<unknown> = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true
  });
  return next(newReq);
};
