import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-consultar-pedidos',
  templateUrl: './consultar-pedidos.component.html',
  styleUrls: ['./consultar-pedidos.component.scss']
})
export class ConsultarPedidosComponent {
  constructor(private operacoes: OperacoesService){ }

  dados!: any;
  dadosPedidos!: any;
  dadosIniciais!: any;
  detalharPedido!: number;
  strBuscarPorUsuario!: string;
  strBuscarPorItem!: string;


  ngOnInit(){
    this.operacoes.consultarMeusPedidos().subscribe((response: any) => {
      this.dadosPedidos = response._data;
      this.dadosIniciais = response._data;
    })
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
    console.log(this.detalharPedido);
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }

  onKeyUpTxtBuscarPorItem() {
    console.log(this.strBuscarPorItem);
    
    this.dadosPedidos = this.dadosIniciais.filter((pedido: any) => {
      return pedido.itens.filter((item: any) => {
        return item.descricao_item.search(this.strBuscarPorItem) > -1;
      });
    });
  }

  onKeyUpTxtBuscarPorUsuario() {
    
  }
}
