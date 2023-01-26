import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  nomeUsuario: string = 'Usuario'

  ngOnInit() {
    this.nomeUsuario = String(localStorage.getItem('nome-usuario'));
  }
}
