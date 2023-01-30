import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.scss']
})
export class MeuCadastroComponent {
  constructor(private auth: AuthService){}
  editarUsuarioForm!: FormGroup;
  dadosAlterados: boolean = false;
  idUsuario!: string;
  dadosUsuario!: any;
  payload!: any;
  btnSalvarEnabled: boolean = false;

  ngOnInit() {
    this.editarUsuarioForm = new FormGroup({
      nome_usuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email_usuario: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });
        
    this.auth.carregaInfoUsuario().subscribe((response: any) => {
      this.dadosUsuario = response;
      console.log(response);
      this.idUsuario = response.id;
      this.editarUsuarioForm.get('nome_usuario')?.setValue(this.dadosUsuario.nome);
      this.editarUsuarioForm.get('email_usuario')?.setValue(this.dadosUsuario.email);
    });

    this.editarUsuarioForm.valueChanges.subscribe(objDados => {
      this.payload = objDados;
      this.payload.id_usuario = this.idUsuario;
      this.payload.nome_usuario = this.editarUsuarioForm.get('nome_usuario')?.value;
      let email = String(this.editarUsuarioForm.get('email_usuario')?.value);
      this.payload.email_usuario = email.toLocaleLowerCase();
      this.confereAlteracoes();
    });

  }

  get email_usuario () {
    return this.editarUsuarioForm.get('email_usuario')!;
  }

  confereAlteracoes() {
    if(
      this.payload.nome_usuario == this.dadosUsuario.nome &&
      this.payload.email_usuario == this.dadosUsuario.email
    ) {
      this.dadosAlterados = false;
      this.toggleBtnSalvar();
    } else {
      this.dadosAlterados = true;
      this.toggleBtnSalvar();
    }
  }

  toggleBtnSalvar() {
    if(this.dadosAlterados == true && !this.editarUsuarioForm.invalid) {
      this.btnSalvarEnabled = true;
    } else {
      this.btnSalvarEnabled = false;
    }
  }

  submit() {
    this.auth.alteraDadosUsuario(this.payload);
  }
}
