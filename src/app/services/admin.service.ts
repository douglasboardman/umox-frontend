import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TopMessage } from 'src/models/TopMessage';
import { MessengerService } from './messenger.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private webRequestService: WebRequestService, private router: Router, private messenger: MessengerService) { }

  gerenciarEstoque() {
    return this.webRequestService.get('admin/itens/gerenciarEstoque');
  }

  consultarPedidosParaAtendimento() {
    return this.webRequestService.get('admin/pedidos/atendimento');
  }

  abrirAtendimentoPedido(idPedido: string) {
    return this.webRequestService.get('admin/pedidos/atenderPedido/' + idPedido);
  }

  finalizarPedido(payload: any) {
    return this.webRequestService.post('admin/pedidos/atenderPedido', payload).subscribe((res: any) => {
        
        if(!res.error) {
          let msg = new TopMessage(
            'Pedido finalizado com sucesso!',
            'is-success',
            'atendimento'
          )
          this.messenger.sendMessage(msg);
          this.router.navigate(['admin/pedidos/atendimento']);
        }
        
    });
  }

  listarNaturezas() {
    return this.webRequestService.get('admin/itens/listarNaturezas');
  }

  abrirEdicaoItem(idItem: string) {
    return this.webRequestService.get('admin/itens/editarItem/' + idItem);
  }

  concluirEdicaoItem(payload: any) {
    return this.webRequestService.post('admin/itens/editarItem', payload).subscribe((res: any) => {
        
      if(!res.error) {
        let msg = new TopMessage(
          'Item atualizado com sucesso!',
          'is-success',
          'gerenciarEstoque'
        )
        this.messenger.sendMessage(msg);
        this.router.navigate(['admin/itens/gerenciarEstoque']);
      };
    })
  }

  cadastrarItem(payload: any) {
    return this.webRequestService.post('admin/itens/cadastrarItem', payload).subscribe((res: any) => {
        
      if(!res.error) {
        let msg = new TopMessage(
          'Item cadastrado com sucesso!',
          'is-success',
          'gerenciarEstoque'
        )
        this.messenger.sendMessage(msg);
        this.router.navigate(['admin/itens/gerenciarEstoque']);
      };
    })
  }

  listarUsuarios() {
    return this.webRequestService.get('admin/usuarios');
  }

  abrirEdicaoUsuario(idUsuario: string) {
    return this.webRequestService.get('admin/usuarios/editarUsuario/' + idUsuario);
  }

  concluirEdicaoUsuario(payload: any) {
    return this.webRequestService.post('admin/usuarios/editarUsuario', payload).subscribe((res: any) => {
        
      if(!res.error) {
        let msg = new TopMessage(
          'Cadastro do usuário atualizado com sucesso!',
          'is-success',
          'gerenciarUsuarios'
        )
        this.messenger.sendMessage(msg);
        this.router.navigate(['admin/usuarios']);
      };
    })
  }

}
