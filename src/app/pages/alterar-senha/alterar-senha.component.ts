import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { matchValidator } from 'src/app/utils/comon';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent {
  constructor(private auth: AuthService, private route: ActivatedRoute){}
  alterarSenhaForm!: FormGroup;
  idUsuario!: string;
  dadosUsuario!: any;
  payload!: any;
  btnSalvarEnabled: boolean = false;
  dadosFormAlterados: boolean = false;
  dadosIniciais!: any;

  ngOnInit() {
    this.alterarSenhaForm = new FormGroup({
      senha_usuario: new FormControl('', Validators.compose([Validators.required, matchValidator('confirmar_senha', true)])),
      confirmar_senha: new FormControl('', Validators.compose([Validators.required, matchValidator('senha_usuario')]))
    });
        
    // this.auth.carregaInfoUsuario().subscribe((response: any) => {
    //   this.dadosUsuario = response;
    //   console.log(response);
    //   this.idUsuario = response.id;
    //   this.alterarSenhaForm.get('nome_usuario')?.setValue(this.dadosUsuario.nome);
    //   this.alterarSenhaForm.get('email_usuario')?.setValue(this.dadosUsuario.email);
    // });
    this.dadosIniciais = {
      senha_usuario: this.alterarSenhaForm.get('senha_usuario'),
      confirmar_senha: this.alterarSenhaForm.get('confirmar_senha')
    }
    this.alterarSenhaForm.valueChanges.subscribe(objDados => {
      if(
          this.dadosIniciais.senha_usuario != this.alterarSenhaForm.get('senha_usuario') ||
          this.dadosIniciais.confirmar_senha != this.alterarSenhaForm.get('confirmar_senha')
      ) {
        this.dadosFormAlterados = true;
      }
      this.payload = objDados;
      this.payload.id_usuario = this.idUsuario;
      this.payload.senha_usuario = this.alterarSenhaForm.get('senha_usuario')?.value;
    });

  }

  get senha_usuario() {
    return this.alterarSenhaForm.get('senha_usuario')!;
  }

  get confirmar_senha() {
    return this.alterarSenhaForm.get('confirmar_senha')!;
  }

  toggleBtnSalvar() {
    if(!this.alterarSenhaForm.invalid) {
      this.btnSalvarEnabled = true;
    } else {
      this.btnSalvarEnabled = false;
    }
  }

  submit() {
    this.auth.alteraDadosUsuario(this.payload);
  }
}
