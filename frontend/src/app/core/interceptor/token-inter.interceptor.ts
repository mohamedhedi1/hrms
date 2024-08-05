import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      const myToken = localStorage.getItem('token');

      if (myToken) {
        const cloneRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${myToken}`
          }
        });

        return next.handle(cloneRequest).pipe(
          catchError((error) => {
            return throwError(error);
          })
        );
      }
    }

    return next.handle(req);
  }
}
