import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/utils/form-validators';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  
  registerForm!: FormGroup;

  constructor() {}

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

  }

  onRegisterButtonClicked() {
    
  }
}
