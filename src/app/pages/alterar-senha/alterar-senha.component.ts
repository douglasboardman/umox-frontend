import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { matchValidator } from 'src/app/utils/comon';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute){}
  alterarSenhaForm!: FormGroup;
  idUsuario!: string;
  dadosUsuario!: any;
  payload!: any;
  btnSalvarEnabled: boolean = false;
  dadosFormAlterados: boolean = false;
  dadosIniciais!: any;
  token: string = '';

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.token = params['token'];
        this.auth.confereTokenAltSenha(this.token).subscribe((res: any) => {
          if(!res._error) {
          }
        });
      });
      
      this.alterarSenhaForm = new FormGroup({
        senha_usuario: new FormControl('', Validators.compose([Validators.required, matchValidator('confirmar_senha', true)])),
        confirmar_senha: new FormControl('', Validators.compose([Validators.required, matchValidator('senha_usuario')]))
      });
          
      this.dadosIniciais = {
        senha_usuario: this.alterarSenhaForm.get('senha_usuario'),
        confirmar_senha: this.alterarSenhaForm.get('confirmar_senha')
      }

    this.alterarSenhaForm.valueChanges.subscribe(objDados => {
      if(
          this.alterarSenhaForm.get('senha_usuario')?.value.length > 0 &&
          this.alterarSenhaForm.get('confirmar_senha')?.value.length > 0
      ) {
        this.payload = objDados;
        this.payload.id_usuario = this.idUsuario;
        this.payload.senha_usuario = this.alterarSenhaForm.get('senha_usuario')?.value;
        this.toggleBtnSalvar();
      } else {
        this.toggleBtnSalvar();
      }
    });
    
  }

  get senha_usuario() {
    return this.alterarSenhaForm.get('senha_usuario')!;
  }

  get confirmar_senha() {
    return this.alterarSenhaForm.get('confirmar_senha')!;
  }

  onFocusOut() {
    this.dadosFormAlterados = true;
  }

  toggleBtnSalvar() {
    if(!this.alterarSenhaForm.invalid) {
      this.btnSalvarEnabled = true;
    } else {
      this.btnSalvarEnabled = false;
    }
  }

  onButtonCancelarClick() {
    this.auth.confereSessao().subscribe((res: any) => {
      if(res.sessaoAtiva) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  submit() {
    this.auth.alteraDadosUsuario(this.payload);
  }
}
