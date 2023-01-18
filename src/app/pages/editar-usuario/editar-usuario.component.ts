import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  constructor(private admin: AdminService, private route: ActivatedRoute){}
  editarUsuarioForm!: FormGroup;
  dadosAlterados: boolean = false;
  listaPerfis!: any;
  idUsuario!: string;
  dadosUsuario!: any;
  payload!: any;
  btnSalvarEnabled: boolean = false;

  ngOnInit() {
    this.editarUsuarioForm = new FormGroup({
      nome_usuario: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email_usuario: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      perfil_usuario: new FormControl('', Validators.required),
      acesso_permitido: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.idUsuario = params['uid'];
        this.admin.abrirEdicaoUsuario(this.idUsuario).subscribe((response: any) => {
          this.dadosUsuario = response._data.dadosUsuario;
          this.listaPerfis = response._data.perfis;
          this.editarUsuarioForm.get('nome_usuario')?.setValue(this.dadosUsuario.nome_usuario);
          this.editarUsuarioForm.get('nome_usuario')?.disable();
          this.editarUsuarioForm.get('email_usuario')?.setValue(this.dadosUsuario.email_usuario);
          this.editarUsuarioForm.get('perfil_usuario')?.setValue(this.dadosUsuario.perfil_usuario);
          this.editarUsuarioForm.get('acesso_permitido')?.setValue(this.dadosUsuario.acesso_permitido);
        });
      }
    )

    this.editarUsuarioForm.valueChanges.subscribe(objDados => {
      this.payload = objDados;
      this.payload.nome_usuario = this.dadosUsuario.nome_usuario;
      this.payload.email_usuario = this.payload.email_usuario.toLowerCase();
      this.confereAlteracoes();
    });

  }

  onClickInputAcessoPermitido() {
    this.acesso_permitido = !this.acesso_permitido;
    console.log(this.acesso_permitido);
  }

  get acesso_permitido () {
    return this.editarUsuarioForm.get('acesso_permitido')!.value;
  }

   set acesso_permitido (value: boolean) {
     this.editarUsuarioForm.get('acesso_permitido')!.setValue(value)
  }

  get email_usuario () {
    return this.editarUsuarioForm.get('email_usuario')!;
  }

  confereAlteracoes() {
    if(
      this.payload.email_usuario == this.dadosUsuario.email_usuario &&
      this.payload.perfil_usuario == this.dadosUsuario.perfil_usuario &&
      this.payload.acesso_permitido == this.dadosUsuario.acesso_permitido
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

  }
}
