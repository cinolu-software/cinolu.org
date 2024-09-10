import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let newReq = req.clone();
  if (!req.url.includes('icons')) {
    newReq = req.clone({
      url: environment.apiUrl + req.url,
      headers: req.headers.set('Authorization', 'Bearer ')
    });
  }
  return next(newReq);
};
