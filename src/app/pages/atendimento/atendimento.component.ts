import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent {
  constructor(private admin: AdminService, private messenger: MessengerService){}

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  
  dadosPedidos!: any;
  detalharPedido!: number;


  ngOnInit(){
    this.admin.consultarPedidosParaAtendimento().subscribe((response: any) => {
      this.dadosPedidos = response._data;
    });

    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'atendimento'){
        this.notification = msg;
      }
    });
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
  }

  mostrarDetalhesPedido(id: number){
    this.detalharPedido = id;
  }

  ocultarDetalhesPedido() {
    this.detalharPedido = 0;
  }
}
