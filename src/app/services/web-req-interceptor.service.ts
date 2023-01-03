import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, empty, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class WebReqInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      switchMap(() => {
        request = this.addAuthHeader(request);
        return next.handle(request);
      }),
      catchError((err: any) => {
        console.log(err);
        this.authService.logout()
        return empty();
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>){
    // get access token
    const token = this.authService.getAccessToken();
    if(token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
