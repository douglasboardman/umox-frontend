import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  
  constructor(private authService: AuthService, private messenger: MessengerService) {}
  
  loginForm!: FormGroup;
  msgClass!: string;
  message!: string;
  
  ngOnInit() {
    this.messenger.receiveMessage().subscribe((msg) => {
      this.message = msg.message;
      this.msgClass = msg.msgType;
    })
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
        console.log(response);
      })
    }
  }

}
