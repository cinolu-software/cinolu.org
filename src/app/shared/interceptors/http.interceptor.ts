import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment as e } from 'environments/environment';
import { Observable } from 'rxjs';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newReq = req.clone();
  const url = req.url;
  newReq = req.clone({
    url: url.includes('icons') ? e.baseUrl + url : e.apiUrl + url,
    withCredentials: true
  });
  return next(newReq);
};
