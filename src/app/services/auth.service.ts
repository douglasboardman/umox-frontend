import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { TopMessage } from 'src/models/TopMessage';
import { __param } from 'tslib';
import { MessengerService } from './messenger.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webRequestService: WebRequestService, private router: Router, private messenger: MessengerService) { }
  auth!: string;

  login(email: string, senha: string) {
    return this.webRequestService.login(email, senha).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        let usuario = res.body;
        this.setSession(usuario.id, String(res.headers.get('x-access-token')));
        console.log('Logado');
        this.auth = 'logged-in';
        this.router.navigateByUrl('/dashboard');
      })
    )
  }

  logout() {
    this.auth = 'logged-out'
    this.removeSession();
    this.router.navigateByUrl('/login')
  }

  register(nome: string, email: string, senha: string) {
    return this.webRequestService.register(nome, email, senha).pipe(
      tap((res: HttpResponse<any>) => {
        if(res.status == 200) {
          let msg = new TopMessage('Sua solicitação de cadastro foi enviada com sucesso.\n' +
                                   'Aguarde a aprovação do administrador para acessar o sistema.',
                                   'is-success', 'login');
          this.messenger.sendMessage(msg);
          this.router.navigateByUrl('/login');
        }
      })
    )
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token')
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(idUsuario: string, accessToken: string) {
    localStorage.setItem('id-usuario', idUsuario);
    localStorage.setItem('x-access-token', accessToken);
  }

  private removeSession() {
    localStorage.removeItem('id-usuario');
    localStorage.removeItem('x-access-token');
  }
}
