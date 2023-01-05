import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent {
  constructor(private operacoes: OperacoesService){}
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;

  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((dados: any) => {
      this.dadosOriginais = dados.listaItens;
      this.dadosItens = dados.listaItens;
    });
  }

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }
}
