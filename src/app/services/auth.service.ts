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

  carregaDadosDashboard() {
    return this.webRequestService.get('auth/dashboard');
  }

  carregaInfoUsuario() {
    return this.webRequestService.get('auth/dadosUsuario');
  }

  gerarTokenAltSenha(email: string) {
    return this.webRequestService.get(`auth/gerarTokenAltSenha/${email}`);
  }

  confereTokenAltSenha(token: string) {
    return this.webRequestService.get(`auth/alterarSenha/${token}`);
  }

  alteraDadosUsuario(payload: any) {
    const nome_usuario = payload.nome_usuario;
    return this.webRequestService.post('auth/alteraDadosUsuario', payload).subscribe((res: any) => {
      if(!res.error) {
        let msg = new TopMessage(
          'Cadastro atualizado com sucesso!',
          'is-success',
          'dashboard'
        )
        this.messenger.sendMessage(msg);
        this.router.navigate(['/dashboard']);
        localStorage.setItem('nome-usuario', nome_usuario);
      }
    });
  }

  alteraSenhaUsuario(payload: any) {
    return this.webRequestService.patch('auth/alteraSenhaUsuario', payload).subscribe((res: any) => {
      if(!res.error) {
        let destino = 'login';
        this.confereSessao().subscribe((res: any) => {
          if(res.sessaoAtiva) {
            destino = 'dashboard';
          } else {
            destino = 'login';
          }
        });

        let msg = new TopMessage(
          'Senha do Usuário atualizada com sucesso!',
          'is-success',
          destino
        )
        this.messenger.sendMessage(msg);
        this.router.navigate([`/${destino}`]);
      }
    });
  }

  login(email: string, senha: string) {
    return this.webRequestService.login(email, senha).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        let usuario = res.body;
        this.setSession(usuario.id, usuario.nome, String(res.headers.get('x-access-token')));
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

  listarPermissoesUsuario() {
    return this.webRequestService.get('auth/permissoesUsuario');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token')
  }

  setAccessToken(accessToken: string) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  confereSessao() {
    return this.webRequestService.get('auth/confereSessao');
  }

  private setSession(idUsuario: string, nomeUsuario: string, accessToken: string) {
    localStorage.setItem('id-usuario', idUsuario);
    localStorage.setItem('nome-usuario', nomeUsuario);
    localStorage.setItem('x-access-token', accessToken);
  }

  private removeSession() {
    localStorage.removeItem('id-usuario');
    localStorage.removeItem('nome-usuario');
    localStorage.removeItem('x-access-token');
  }
}
