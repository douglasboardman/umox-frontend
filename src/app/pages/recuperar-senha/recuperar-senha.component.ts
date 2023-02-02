import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { matchValidator } from 'src/app/utils/comon';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute){}
  recuperarSenhaForm!: FormGroup;
  idUsuario!: string;
  dadosUsuario!: any;
  payload!: any;
  btnRecuperarSenha: boolean = false;
  dadosFormAlterados: boolean = false;
  dadosIniciais!: any;
  token: string = '';
  destino: string = '/login';

  ngOnInit() {

    this.recuperarSenhaForm = new FormGroup({
      email_usuario: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });
        
    this.dadosIniciais = {
      email_usuario: this.recuperarSenhaForm.get('email_usuario')
    }

    this.recuperarSenhaForm.valueChanges.subscribe(objDados => {
      if(
          this.recuperarSenhaForm.get('email_usuario')?.value.length > 0
      ) {
        this.payload = objDados;
        this.toggleBtnRecuperarSenha();
      } else {
        this.toggleBtnRecuperarSenha();
      }
    });
    
  }

  get email_usuario() {
    return this.recuperarSenhaForm.get('email_usuario')!;
  }

  onFocusOut() {
    this.dadosFormAlterados = true;
  }

  toggleBtnRecuperarSenha() {
    if(!this.recuperarSenhaForm.invalid) {
      this.btnRecuperarSenha = true;
    } else {
      this.btnRecuperarSenha = false;
    }
  }

  submit() {
    this.auth.recuperarSenha(this.payload.email_usuario);
  }
}
