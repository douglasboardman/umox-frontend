import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.scss']
})
export class GerenciarEstoqueComponent {
  constructor(private operacoes: OperacoesService){}
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;

  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((response: any) => {
      this.dadosOriginais = response._data;
      this.dadosItens = response._data;
    });
  }

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }
}
