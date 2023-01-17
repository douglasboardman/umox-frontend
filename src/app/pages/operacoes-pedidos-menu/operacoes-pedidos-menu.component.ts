import { Component } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';
import { AppMenuGroups } from 'src/models/AppStruct';

@Component({
  selector: 'app-operacoes-pedidos-menu',
  templateUrl: './operacoes-pedidos-menu.component.html',
  styleUrls: ['./operacoes-pedidos-menu.component.scss']
})
export class OperacoesPedidosMenuComponent {
  listaMenus!: Array<PanelMenu>;

  ngOnInit() {
    this.listaMenus = AppMenuGroups.operacoes_pedidos;
  }
}
