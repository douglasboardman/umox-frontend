import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private messenger: MessengerService, private auth: AuthService){}

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  metricasStatusPedidos!: any;
  pedidosAtendidos!: number;
  pedidosNaoAtendidos!: number;
  pedidosAtendidosParcialmente!: number;
  pedidosAguardandoAtendimento!: number;
  totalPedidos!: number;


  ngOnInit(){
    this.auth.carregaDadosDashboard().subscribe((dados: any) => {
      console.log(dados);
      this.metricasStatusPedidos = dados;
      let f = dados.filter((reg: any) => {return reg.status_pedido == 'ATENDIDO'});
      this.pedidosAtendidos = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'ATENDIDO PARCIALMENTE'});
      this.pedidosAtendidosParcialmente = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'NÃO ATENDIDO'});
      this.pedidosNaoAtendidos = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'AGUARDANDO ATENDIMENTO'});
      this.pedidosAguardandoAtendimento = parseInt(f[0].qtd);
      this.totalPedidos = this.pedidosAtendidos + this.pedidosAguardandoAtendimento + this.pedidosAtendidosParcialmente + this.pedidosNaoAtendidos;
    });

    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'dashboard'){
        this.notification = msg;
      }
    })
  }

  ngOnDestroy(){
    this.$subs.unsubscribe();
    //this.messenger.cleanMessage();
  }
}
