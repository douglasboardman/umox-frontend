import { Component } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';
import { AppMenuGroups } from 'src/models/AppStruct';

@Component({
  selector: 'app-admin-pedidos-menu',
  templateUrl: './admin-pedidos-menu.component.html',
  styleUrls: ['./admin-pedidos-menu.component.scss']
})
export class AdminPedidosMenuComponent {
  listaMenus!: Array<PanelMenu>;

  ngOnInit() {
    this.listaMenus = AppMenuGroups.admin_pedidos;
  }
}
