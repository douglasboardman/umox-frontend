import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { checaInputQtd } from 'src/app/utils/comon';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent {
  constructor(@Inject(DOCUMENT) document: Document, private operacoes: OperacoesService){}
  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;
  itensPedido: Array<any> = [];
  formNovoPedido = {submitted: false, validated: false};
  finalidade = {invalid: true, value: ''};
  

  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((dados: any) => {
      this.dadosOriginais = dados.listaItens;
      this.dadosItens = dados.listaItens;
    });
  }

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }

  onKeyUpTxtFinalidade() {
    if(this.finalidade.value.length < 30) {
      this.finalidade.invalid = true;
    } else {
      this.finalidade.invalid = false;
    }
    console.log(this.finalidade.value);
  }

  onKeyUpInputQtd(id: string) {
    let input = document.getElementById('qtd_' + id) as HTMLInputElement;
    checaInputQtd(input);
  }

  onAddItemButtonClicked(id: number) {
    let qtdInput = document.getElementById('qtd_' + id) as HTMLInputElement;
    let btnAdd = document.getElementById('btnAdd_' + id) as HTMLButtonElement;
    let qtd = parseInt(qtdInput.value);
    
    if(qtd > 0) {
      let res = this.dadosOriginais.filter((i) => {
         return i.id_item == id;
      });
  
      let item = res[0];
      item.qtd_pedido = qtd;
      this.itensPedido.push(item);
      qtdInput.disabled = true;
      btnAdd.disabled = true;
    }
  }

  onRemItemButtonClicked(id: number) {
    let qtdInput = document.getElementById('qtd_' + id) as HTMLInputElement;
    let btnAdd = document.getElementById('btnAdd_' + id) as HTMLButtonElement;

    this.itensPedido = this.itensPedido.filter((item) => {
      item.id_item != id;
    });

    qtdInput.value = '';
    qtdInput.disabled = false;
    btnAdd.disabled = false;
  }

  submit() {
    this.formNovoPedido.submitted = true;
    return console.log('Form submitted');
  }

}
