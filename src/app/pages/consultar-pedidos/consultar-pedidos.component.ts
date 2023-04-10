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
  listaPedidos: Array<any> = [];
  pedidosUsuario: Array<any> = [];
  pedidosItem: Array<any> = [];
  source!: any;
  detalharPedido!: number;
  strBuscarPorUsuario: string = '';
  strBuscarPorItem: string = '';


  ngOnInit(){
    this.operacoes.consultarPedidos().subscribe((response: any) => {
      this.source = response._data.data;
      console.log(this.source);
      this.dadosPedidos = response._data.reduced_data;
      this.dadosIniciais = response._data.reduced_data;
    })
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }

  onKeyUpTxtBuscarPorItem() {
    let pedidos = this.source.filter((registro: any) => {
      return registro.descricao_item.search(this.strBuscarPorItem) > -1;
    });

    this.pedidosItem = [];

    pedidos.forEach((pedido: any) => {
      this.pedidosItem.push(pedido.id_pedido);
    });
    
    this.listaPedidos = [];
    
    if(this.pedidosUsuario.length > 0) {
      this.pedidosItem.forEach((pedido: any) => {
        if(this.pedidosUsuario.includes(pedido)) {
          this.listaPedidos.push(pedido);
        }
      });
    } else {
      this.pedidosItem.forEach((pedido: any) => {
        this.listaPedidos.push(pedido);
      });
    }

    this.dadosPedidos = this.dadosIniciais.filter((pedido: any) => {
        return this.listaPedidos.includes(pedido.id_pedido);
    });
  }

  onKeyUpTxtBuscarPorUsuario() {
    let pedidos = this.source.filter((registro: any) => {
      return registro.nome_usuario.search(this.strBuscarPorUsuario) > -1;
    });

    this.pedidosUsuario = [];

    pedidos.forEach((pedido: any) => {
      this.pedidosUsuario.push(pedido.id_pedido);
    });
    
    this.listaPedidos = [];
    
    if(this.pedidosItem.length > 0) {
      this.pedidosUsuario.forEach((pedido: any) => {
        if(this.pedidosItem.includes(pedido)) {
          this.listaPedidos.push(pedido);
        }
      });
    } else {
      this.pedidosUsuario.forEach((pedido: any) => {
        this.listaPedidos.push(pedido);
      });
    }

    this.dadosPedidos = this.dadosIniciais.filter((pedido: any) => {
        return this.listaPedidos.includes(pedido.id_pedido);
    });
  }
}
