import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { OperacoesService } from 'src/app/services/operacoes.service';
import { dateToView } from 'src/app/utils/comon';
import { checaInputQtd } from 'src/app/utils/comon';

@Component({
  selector: 'app-atender-pedido',
  templateUrl: './atender-pedido.component.html',
  styleUrls: ['./atender-pedido.component.scss']
})
export class AtenderPedidoComponent {
  constructor(private route: ActivatedRoute, private operacoes: OperacoesService) {}

  atenderPedidoForm!: FormGroup;
  dadosPedido!: any;
  idPedido!: number;
  solicitante!: string;
  dataPedido!: string;
  finalidade!: string;
  qtdsTotais!: number;
  idsItens: Array<string> = [];
  tituloModal!: string;
  msgModal!: string;
  mostrarModal: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.idPedido = params['pid'];
        this.operacoes.consultarPedidoParaAtendimento(String(this.idPedido)).subscribe((response: any) => {
          this.dadosPedido = response._data;
          let dados = this.dadosPedido[0];
          this.solicitante = dados.nome_usuario;
          this.dataPedido = dateToView(dados.data_pedido);
          this.finalidade = dados.finalidade_pedido;
          this.qtdsTotais = this.dadosPedido.reduce((acc: number, curr: any) => { return acc + parseFloat(curr.qtd_solicitada) }, 0);
          this.dadosPedido.forEach((item: any) => {
            this.idsItens.push(item.id_item);
          });
        })
      }
    )
    
    this.atenderPedidoForm = new FormGroup({
      obsAtendimento: new FormControl('', Validators.compose([Validators.required, Validators.minLength(30)]))
    })
  }

  get obsAtendimento() {
    return this.atenderPedidoForm.get('obsAtendimento')!;
  }

  somaQtdsAtendimento = () => {
    let soma: number = 0;
    
    this.idsItens.forEach((id: string) => {
      let input = document.getElementById('input-qtd-item-' + id) as HTMLInputElement;
      if(input.value){
        soma = soma + parseFloat(input.value);  
      }
    });
    
    return soma;
  }

  

  onKeyPressedInputQtd(idInput: string) {
    let input = document.getElementById(idInput) as HTMLInputElement;
    checaInputQtd(input);
  }

  submit() {
    let qtdAtendida = this.somaQtdsAtendimento();
    let status = '';
    
    if(!this.atenderPedidoForm.invalid) {
      if(qtdAtendida == 0) {
        status = 'NÃO ATENDIDO';
      } else if(qtdAtendida == this.qtdsTotais) {
        status = 'ATENDIDO';
      } else {
        status = 'ATENDIDO PARCIALMENTE';
      }
      this.msgModal = `Confirma a finalização do atendimento do presente pedido com o status de '${status}'?`
      this.tituloModal = 'Finalizar Atendimento';
      this.mostrarModal = true;
    }
  }
  
  cancelarFinalizacaoPedido() {
    this.mostrarModal = false;
  }
  finalizarPedido() {}
}
