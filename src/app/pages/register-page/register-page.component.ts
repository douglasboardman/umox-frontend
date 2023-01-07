import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { matchValidator } from 'src/app/utils/comon';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  
  registerForm!: FormGroup;
  msgClasses!: Array<string>;
  msg!: string;

  constructor(private authService: AuthService, private messenger: MessengerService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      nome: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      senha: new FormControl('', Validators.compose([Validators.required, matchValidator('senhaRep', true)])),
      senhaRep: new FormControl('', Validators.compose([Validators.required, matchValidator('senha')]))
    })
  }
  
  get nome() {
    return this.registerForm.get('nome')!;
  }

  get email() {
    return this.registerForm.get('email')!;
  }
  
  get senha() {
    return this.registerForm.get('senha')!;
  }
  
  get senhaRep() {
    return this.registerForm.get('senhaRep')!;
  }

  submit() {
    let nome: string = this.nome.value;
    let email: string =  this.email.value;
    let senha: string = this.senha.value;
    
    if(!this.registerForm.invalid) {
      this.authService.register(nome, email, senha).subscribe((response: any) => {
        //console.log(response.body);
        // let msg = response.body.message;
        // this.messenger.sendMessage(msg);
      });
    }
  }

}
