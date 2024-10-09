import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FuseMockApiReplyCallback =
  | ((data: {
      request: HttpRequest<unknown>;
      urlParams: Record<string, string>;
    }) => [number, string | unknown] | Observable<unknown>)
  | undefined;

export type FuseMockApiMethods = 'get' | 'post' | 'patch' | 'delete' | 'put' | 'head' | 'jsonp' | 'options';
