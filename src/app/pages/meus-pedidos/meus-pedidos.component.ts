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
  id_pedido!: any;

  ngOnInit(){
    this.operacoes.consultarMeusPedidos().subscribe((response: any) => {
      console.log(response._data)
      this.dados = response._data;
      
    })
  }
}
