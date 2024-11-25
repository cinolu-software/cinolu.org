import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newReq = req.clone();
  if (req.url.includes('icons')) return next(newReq);
  newReq = req.clone({
    url: environment.apiUrl + req.url,
    withCredentials: true
  });
  return next(newReq);
};
