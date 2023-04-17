import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { replaceSpecialChars } from '../../utils/comon';

@Component({
  selector: 'app-consultar-estoque',
  templateUrl: './consultar-estoque.component.html',
  styleUrls: ['./consultar-estoque.component.scss']
})
export class ConsultarEstoqueComponent {
  constructor(private operacoes: OperacoesService){}
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText = "";
  listaNaturezas!: Array<any>;
  natureza = "0";

  ngOnInit(){
    this.operacoes.listarNaturezas().subscribe((response: any)=> {
      this.listaNaturezas = response._data;
    });

    this.operacoes.consultarEstoque().subscribe((response: any) => {
      this.dadosOriginais = response._data;
      this.dadosItens = response._data;
    });
  }

  onSelNaturezasChanged() {
    let searchFor = replaceSpecialChars(this.searchText.toUpperCase());

    if(searchFor.length > 0 && this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item)=>{
        return item.id_natureza == this.natureza && replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    } else if(searchFor.length > 0 && this.natureza == "0") {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    } else if(searchFor.length <= 0 && this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item)=>{
        return item.id_natureza == this.natureza;
      });
    } else {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    }
  }

  onKeyUpTxtConsulta() {
    let searchFor = replaceSpecialChars(this.searchText.toUpperCase());

    if(this.natureza != "0") {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1 && item.id_natureza == this.natureza;
      });
    } else {
      this.dadosItens = this.dadosOriginais.filter((item) => {
        return replaceSpecialChars(String(item.descricao_item).concat(' ' + item.marca_item)).search(searchFor) > -1;
      });
    }
  }

}
