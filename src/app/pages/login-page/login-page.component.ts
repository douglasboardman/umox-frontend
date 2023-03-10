import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { subscribeOn, Subscription, tap } from 'rxjs';
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
  visMsg!: string;
  msgClass!: string;
  message!: string;
  $subs!: Subscription;
  notification: TopMessage = new TopMessage('','','');
  
  ngOnInit() {
    
    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'login') {
        this.notification = msg;
        this.visMsg = 'show';
      }
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', [Validators.required])
    });
    
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get senha() {
    return this.loginForm.get('senha')!;
  }

  onHideNotification() {
    this.visMsg = 'hide';
  }

  submit() {
    let email: string = this.email.value;
    let senha: string = this.senha.value;

    if(!this.loginForm.invalid) {
      this.authService.login(email, senha).subscribe();
      this.messenger.cleanMessage();      
    }
  }

}
