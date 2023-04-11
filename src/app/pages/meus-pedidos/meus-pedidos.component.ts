import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.scss']
})
export class MeusPedidosComponent {
  constructor(private operacoes: OperacoesService){ }

  dados!: any;
  dadosPedidos: any = [];
  detalharPedido!: number;


  ngOnInit(){
    try {
      this.operacoes.consultarMeusPedidos().subscribe((response: any) => {
        this.dadosPedidos = response._data;
      })
    } catch (error) {
      this.dadosPedidos = [];
    }
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }
}
