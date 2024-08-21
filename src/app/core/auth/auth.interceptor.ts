import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiReq = req.clone({ withCredentials: true });
  return next(apiReq);
};
