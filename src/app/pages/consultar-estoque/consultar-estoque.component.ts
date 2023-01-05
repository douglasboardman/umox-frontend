import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-consultar-estoque',
  templateUrl: './consultar-estoque.component.html',
  styleUrls: ['./consultar-estoque.component.scss']
})
export class ConsultarEstoqueComponent {
  constructor(private operacoes: OperacoesService){}
  dadosItens: any;

  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((dados: any) => {
      this.dadosItens = dados.listaItens;
    });
  }
}
