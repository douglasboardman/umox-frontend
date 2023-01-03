import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private webRequestService: WebRequestService, private router: Router) { }
  
  login(email: string, senha: string) {
    let objReq: Object = {
      email: email,
      senha: senha
    }
    return this.webRequestService.post('login', objReq);
  }
}
