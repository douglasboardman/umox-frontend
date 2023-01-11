import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-atender-pedido',
  templateUrl: './atender-pedido.component.html',
  styleUrls: ['./atender-pedido.component.scss']
})
export class AtenderPedidoComponent {
  constructor(private route: ActivatedRoute, private operacoes: OperacoesService) {}

  dadosPedido!: any;
  idPedido!: number;
  solicitante!: string;
  dataPedido!: string;
  finalidade!: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.idPedido = params['pid'];
        this.operacoes.consultarPedidoParaAtendimento(String(this.idPedido)).subscribe((response: any) => {
          this.dadosPedido = response._data;
          let dados = this.dadosPedido[0];
          this.solicitante = dados.nome_usuario;
          this.dataPedido = dados.data_pedido;
          this.finalidade = dados.finalidade_pedido;
        })
      }
    )
    
  }
}
