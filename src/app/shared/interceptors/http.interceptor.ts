import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment as e } from 'environments/environment';
import { Observable } from 'rxjs';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newReq = req.clone();
  const url = req.url;
  if (url.includes('icons') || url.includes('i18n')) return next(newReq);
  newReq = req.clone({
    url: e.apiUrl + url,
    withCredentials: true
  });
  return next(newReq);
};
