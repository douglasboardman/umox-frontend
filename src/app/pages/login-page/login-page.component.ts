import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  
  constructor(private authService: AuthService, private messenger: MessengerService) {}
  
  loginForm!: FormGroup;
  msgClass!: string;
  message!: string;
  $subs!: Subscription;
  notification: TopMessage = new TopMessage('','','');
  
  ngOnInit() {
    
    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'login') {
        this.notification = msg;
      }
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', [Validators.required])
    });
    
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
    this.messenger.cleanMessage();
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
