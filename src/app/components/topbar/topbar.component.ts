import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  constructor(private auth: AuthService, private router: Router){}
  nomeUsuario: string = 'Usuario'
  idUsuario: string = '';

  ngOnInit() {
    this.nomeUsuario = String(localStorage.getItem('nome-usuario'));
    this.idUsuario = String(localStorage.getItem('id-usuario'));
  }

  onAlterarSenhaButtonClicked() {
    this.auth.carregaInfoUsuario().subscribe((res: any) => {
      this.auth.gerarTokenAltSenha(res.email).subscribe((res: any)=>{
        this.router.navigateByUrl(`/alterarSenha/${res.token}`);
      })
    });
  }
}
