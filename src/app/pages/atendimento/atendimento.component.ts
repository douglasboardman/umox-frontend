import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent {
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
}
