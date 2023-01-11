import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent {
  constructor(private operacoes: OperacoesService){ }
  dadosPedidos!: any;
  detalharPedido!: number;


  ngOnInit(){
    this.operacoes.consultarPedidosParaAtendimento().subscribe((response: any) => {
      this.dadosPedidos = response._data;
    })
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }
}
