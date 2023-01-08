import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, empty, Observable, switchMap } from 'rxjs';
import { TopMessage } from 'src/models/TopMessage';
import { AuthService } from './auth.service';
import { MessengerService } from './messenger.service';

@Injectable({
  providedIn: 'root'
})

export class WebReqInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private messenger: MessengerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let msg = 'Não foi possível concluir a operação. \n' +
                  'Mensagem de erro: ' + error.error.message;
        let notification = new TopMessage(msg, 'is-danger', 'login');
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
