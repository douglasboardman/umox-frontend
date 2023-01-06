import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { checaInputQtd } from 'src/app/utils/comon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoPL } from 'src/models/PedidoPL';
import { ItemPedidoPL } from 'src/models/ItemPedidoPL';

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
  formNovoPedido!: FormGroup;
  payloadPedido = new PedidoPL('',[]);
  finalidadePedido!: string;
  
  ngOnInit(){
    this.operacoes.consultarEstoque().subscribe((dados: any) => {
      this.dadosOriginais = dados.listaItens;
      this.dadosItens = dados.listaItens;
    });
    
    this.formNovoPedido = new FormGroup({
      finalidade: new FormControl('', Validators.compose([Validators.required, Validators.minLength(30)]))    
    });
  }

  get finalidade() {
    return this.formNovoPedido.get('finalidade')!;
  }

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }

  onKeyUpTxtFinalidade() {
    this.payloadPedido.finalidade = this.finalidadePedido;
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
      this.payloadPedido.addItem(id, qtd);
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
    this.payloadPedido.removeItem(id);
  }

  submit() {
    if(!this.formNovoPedido.invalid && this.itensPedido.length > 0){
      
    }
    return console.log('Form submitted');
  }

}
