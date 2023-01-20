import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, empty, Observable } from 'rxjs';
import { TopMessage } from 'src/models/TopMessage';
import { AuthService } from './auth.service';
import { MessengerService } from './messenger.service';

@Injectable({
  providedIn: 'root'
})

export class WebReqInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private messenger: MessengerService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMsg = '';

        if(typeof error.error.message != 'undefined') {
          if(error.error.message.search('jwt') > -1) {
            errorMsg = 'Sua sessão expirou';
          }
        } else if(typeof error.error._message != 'undefined') {
          errorMsg = error.error._message;
        } else {
          errorMsg = error.error;
        }
        let msg = 'Não foi possível concluir a operação. \n' +
                  'Mensagem de erro: ' + errorMsg;
        let notification = new TopMessage(msg, 'is-danger', 'login');
        console.log(notification);
        this.messenger.sendMessage(notification);
        this.authService.logout();
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
