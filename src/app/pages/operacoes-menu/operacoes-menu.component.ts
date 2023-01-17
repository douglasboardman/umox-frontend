import { Component } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';
import { AppMenuGroups } from 'src/models/AppStruct';

@Component({
  selector: 'app-operacoes-menu',
  templateUrl: './operacoes-menu.component.html',
  styleUrls: ['./operacoes-menu.component.scss']
})
export class OperacoesMenuComponent {
  listaMenus!: Array<PanelMenu>;

  ngOnInit() {
    this.listaMenus = AppMenuGroups.operacoes;
  }
}
