import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TopMessage } from 'src/models/TopMessage';
import { MessengerService } from './messenger.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  constructor(private webRequestService: WebRequestService, private router: Router, private messenger: MessengerService) { }
  dadosReq!: any;
  
  consultarEstoque(){
    return this.webRequestService.get('operacoes/itens/consultarEstoque');
  }

  consultarMeusPedidos(){
    return this.webRequestService.get('operacoes/pedidos/meusPedidos');
  }

  consultarPedidos() {
    return this.webRequestService.get('operacoes/pedidos/consultarPedidos');
  }

  consultarPedidosParaAtendimento() {
    return this.webRequestService.get('admin/pedidos/atendimento');
  }

  consultarPedidoParaAtendimento(idPedido: string) {
    return this.webRequestService.get('admin/pedidos/atenderPedido?pid=' + idPedido);
  }

  cadastrarPedido(payload: Object){
    return this.webRequestService.post('operacoes/pedidos/novoPedido', payload).subscribe((res: any) => {
      if(!res.error) {
        let msg = new TopMessage(
          'Pedido criado com sucesso! Confira os detalhes e acompanhe o andamento do seu pedido no menu "Meus Pedidos"',
          'is-success',
          'dashboard'
        )
        this.messenger.sendMessage(msg);
        this.router.navigate(['dashboard']);
      }
    });
  }
}
