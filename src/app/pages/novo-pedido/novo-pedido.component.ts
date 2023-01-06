import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent {
  constructor(@Inject(DOCUMENT) document: Document, private operacoes: OperacoesService){}
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;
  itensPedido: Array<any> = [];
  

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

  onAddItemButtonClicked(id: number) {
    let qtdInput = document.getElementById('qtd_' + id) as HTMLInputElement;
    let qtd = qtdInput.value;
    
    let res = this.dadosOriginais.filter((i) => {
       return i.id_item == id;
    });

    let item = res[0];
    console.log(res[0]);
    item.qtd_pedido = qtd;
    this.itensPedido.push(item);
  }

}
