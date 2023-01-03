import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private authService: AuthService) {}
  email!: string
  senha!: string

  login() {
    this.authService.login(this.email, this.senha).subscribe((response: any) => {
      console.log(response);
    })
  }
}
