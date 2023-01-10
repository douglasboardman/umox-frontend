import { Component } from '@angular/core';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { checaInputQtd } from 'src/app/utils/comon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoPL } from 'src/models/PedidoPL';
import { Router } from '@angular/router';
import { TopMessage } from 'src/models/TopMessage';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.scss']
})
export class NovoPedidoComponent {
  constructor(private operacoes: OperacoesService, private router: Router, private messenger: MessengerService){}

  dadosItens!: Array<any>;
  dadosOriginais!: Array<any>;
  searchText!: string;
  itensPedido: Array<any> = [];
  formNovoPedido!: FormGroup;
  payloadPedido = new PedidoPL('',[]);
  mostrarModal: boolean = false;
  tituloModal: string = '';
  msgModal: string = '';
  
  ngOnInit(){
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

  onKeyUpTxtConsulta() {
    let searchFor = this.searchText.toUpperCase();
    this.dadosItens = this.dadosOriginais.filter((item) => {
      return item.descricao_item.search(searchFor) > -1;
    });
  }

  onKeyUpTxtFinalidade() {
    this.payloadPedido.finalidade = this.formNovoPedido.get('finalidade')?.value;
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
      return console.log('Form submitted');
    }
  }

  enviarPedido() {
    this.mostrarModal = false;
    this.operacoes.cadastrarPedido(this.payloadPedido)
  }

  cancelarEnvioPedido() {
    this.mostrarModal = false;
  }

}
