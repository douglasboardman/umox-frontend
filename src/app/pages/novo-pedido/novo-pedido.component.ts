import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { checaInputQtd, replaceSpecialChars } from 'src/app/utils/comon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoPL } from 'src/models/Pedido';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent {
  constructor(private operacoes: OperacoesService){}

  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText = "";
  listaNaturezas!: Array<any>;
  natureza = "0";
  itensPedido: Array<any> = [];
  formNovoPedido!: FormGroup;
  payloadPedido = new PedidoPL('',[]);
  mostrarModal: boolean = false;
  tituloModal: string = '';
  msgModal: string = '';
  
  ngOnInit(){
    this.operacoes.listarNaturezas().subscribe((response: any)=> {
      this.listaNaturezas = response._data;
    });

    this.operacoes.consultarEstoque().subscribe((response: any) => {
      this.dadosOriginais = response._data;
      this.dadosItens = response._data;
    });
    
    this.formNovoPedido = new FormGroup({
      finalidade: new FormControl('', Validators.compose([Validators.required, Validators.minLength(30)]))    
    });
  }

  get finalidade() {
    return this.formNovoPedido.get('finalidade')!;
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

  onKeyUpTxtFinalidade() {
    let val = this.formNovoPedido.get('finalidade')?.value.toUpperCase();
    this.formNovoPedido.get('finalidade')?.setValue(val);
    this.payloadPedido.finalidade = val;
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
      this.tituloModal = 'Enviar pedido';
      this.msgModal = 'Confirma o envio do pedido para o setor responsável pelo atendimento?';
      this.mostrarModal = false;
      this.mostrarModal = true;
    }
  }

  enviarPedido() {
    this.mostrarModal = false;
    this.operacoes.cadastrarPedido(this.payloadPedido);
  }

  cancelarEnvioPedido() {
    this.mostrarModal = false;
  }

}
