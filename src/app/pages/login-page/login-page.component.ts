import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {}
  loginForm!: FormGroup;
  msgClasses!: Array<string>;
  msg!: string;
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', [Validators.required])
    })
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get senha() {
    return this.loginForm.get('senha')!;
  }

  submit() {
    let email: string = this.email.value;
    let senha: string = this.senha.value;

    if(!this.loginForm.invalid) {
      this.authService.login(email, senha).subscribe((response: any) => {
        if(response.status == 200) {
          this.msg = 'Cadastro realizado com sucesso!'
          this.msgClasses = ['', 'is-info']
        }
        console.log(response);
      })
    }
  }

}
