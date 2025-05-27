import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newReq = req.clone();
  const url = req.url;
  newReq = req.clone({
    url: environment.apiUrl + url,
    withCredentials: true
  });
  return next(newReq);
};
