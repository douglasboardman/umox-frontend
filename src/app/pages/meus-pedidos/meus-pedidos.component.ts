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
  dadosPedidos!: any;
  detalharPedido!: number;


  ngOnInit(){
    this.operacoes.consultarMeusPedidos().subscribe((response: any) => {
      console.log(response);
      this.dadosPedidos = response._data;
    })
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
    console.log(this.detalharPedido);
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }
}
