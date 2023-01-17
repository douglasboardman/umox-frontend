import { Component } from '@angular/core';
import { PanelMenu } from 'src/models/PanelMenu';

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.scss']
})
export class OperacoesComponent {
  listaMenus!: Array<PanelMenu>;

  ngOnInit() {
    this.listaMenus = [
      new PanelMenu(
        'Pedidos',
        'Fazer pedidos e consultar pedidos de material realizados na instituição.',
        'bxs-inbox'
      ),
      new PanelMenu(
        'Itens',
        'Consultar itens em estoque no almoxarifado do Campus',
        'bxs-component'
      )
    ]
  }
}
