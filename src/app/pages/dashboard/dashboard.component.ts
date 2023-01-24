import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { TopMessage } from 'src/models/TopMessage';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private messenger: MessengerService, private auth: AuthService){}
  @ViewChild('pedidosUlt12Meses', {static: true}) graficoPedidosUlt12Meses!: ElementRef
  @ViewChild('incidNaturezasPedidos', {static: true}) graficoIncidNaturezasPedidos!: ElementRef
  

  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  metricasStatusPedidos!: any;
  pedidosAtendidos!: number;
  pedidosNaoAtendidos!: number;
  pedidosAtendidosParcialmente!: number;
  pedidosAguardandoAtendimento!: number;
  totalPedidos!: number;
  composicaoEstoque: Array<any> = [];


  ngOnInit(){
    this.auth.carregaDadosDashboard().subscribe((dados: any) => {
      this.carregaMetricasPedidos(dados.metricasStatusPedidos);
      this.carregaGraficoPedidosUlt12Meses(dados.pedidosUlt12Meses);
      this.carregaGraficoIncidNaturezasPedidos(dados.incidNaturezasPedidos);
      this.composicaoEstoque = dados.composicaoEstoque;
    });
    
    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'dashboard'){
        this.notification = msg;
      }
    })
  }

  carregaMetricasPedidos(dados: any) {
      this.metricasStatusPedidos = dados;
      let f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'ATENDIDO'});
      this.pedidosAtendidos = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'ATENDIDO PARCIALMENTE'});
      this.pedidosAtendidosParcialmente = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'NÃO ATENDIDO'});
      this.pedidosNaoAtendidos = parseInt(f[0].qtd);
      f = this.metricasStatusPedidos.filter((reg: any) => {return reg.status_pedido == 'AGUARDANDO ATENDIMENTO'});
      this.pedidosAguardandoAtendimento = parseInt(f[0].qtd);
      this.totalPedidos = this.pedidosAtendidos + this.pedidosAguardandoAtendimento + this.pedidosAtendidosParcialmente + this.pedidosNaoAtendidos;
  }

  carregaGraficoPedidosUlt12Meses(dados: any) {
    
   new Chart(this.graficoPedidosUlt12Meses.nativeElement, {
      type: 'bar',
      data: {
        labels: dados.map((row: any) => row.mes),
        datasets: [
          {
            label: 'Pedidos últimos 12 meses',
            data: dados.map((row: any) => row.incidencia)
          }
        ]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }

  carregaGraficoIncidNaturezasPedidos(dados: any) {
    console.log(dados[0].incidencia);
    let registros = dados.length;

    let vals: Array<number> = [];
    let outros: number = 0;
    let labels: Array<string> = [];

    if(registros > 4) {
      for(let i = 0; i < registros; i++) {
        if (i <= 4) {
          vals.push(parseInt(dados[i].incidencia));
          labels.push(dados[i].natureza_item);
        } else {
          outros += parseInt(dados[i].incidencia); 
        }
      }
    }

    if(outros > 0) {
      vals.push(outros);
      labels.push('OUTROS');
    }

    const data = {
      labels: labels,
      datasets: [{
        label: 'Naturezas de itens mais solicitados',
        data: vals,
        hoverOffset: 4
      }]
    };

    new Chart(this.graficoIncidNaturezasPedidos.nativeElement, {
       type: 'doughnut',
       data: data,
       options: {
        layout: {autoPadding: true},
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        }  
       }
      },  
    );
   }

  ngOnDestroy(){
    this.$subs.unsubscribe();
    //this.messenger.cleanMessage();
  }
}
