import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  constructor(private admin: AdminService) {}
  usuarios!: any;

  ngOnInit() {
      this.admin.listarUsuarios().subscribe((response: any) => {
        this.usuarios = response._data;
      })
  }
}
