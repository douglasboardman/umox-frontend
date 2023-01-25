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
  @ViewChild('composicaoPedidos', {static: true}) graficoComposicaoPedidos!: ElementRef
  
  notification: TopMessage = new TopMessage('','','');
  $subs!: Subscription;
  metricasStatusPedidos!: any;
  pedidosAtendidos!: number;
  pedidosNaoAtendidos!: number;
  pedidosAtendidosParcialmente!: number;
  pedidosAguardandoAtendimento!: number;
  totalPedidos!: number;
  composicaoEstoque: Array<any> = [];
  labelsComposPedidos: Array<any> = [];
  itensMaisSolicitados: Array<any> = [];
  solicitantesMaisAtivos: Array<any> = [];


  ngOnInit(){
    this.auth.carregaDadosDashboard().subscribe((dados: any) => {
      this.carregaMetricasPedidos(dados.metricasStatusPedidos);
      this.carregaGraficoPedidosUlt12Meses(dados.pedidosUlt12Meses);
      this.carregaGraficoComposicaoPedidos(dados.composicaoPedidos);
      this.carregaDadosComposicaoEstoque(dados.composicaoEstoque);
      this.itensMaisSolicitados = dados.itensMaisSolicitados;
      this.solicitantesMaisAtivos = dados.solicitantesMaisAtivos;
    });
    
    this.$subs = this.messenger.receiveMessage().subscribe((msg) => {
      if(msg.target == 'dashboard'){
        this.notification = msg;
      }
    })
  }

  carregaDadosComposicaoEstoque(dados: Array<any>) {
    let i = 0;
    while(i < 9 && i < dados.length) {
      this.composicaoEstoque[i] = {natureza: dados[i].natureza, incidencias: parseInt(dados[i].incidencias)};
      i++;
    }

    if(dados.length > 10) {
      let sum = 0;
      while(i < dados.length) {
        sum += parseInt(dados[i].incidencias);
        i++;
      }
      this.composicaoEstoque.push({natureza: 'OUTROS', incidencias: sum});
    }
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
      type: 'line',
      data: {
        labels: dados.map((row: any) => row.mes),
        datasets: [
          {
            label: 'volume de pedidos',
            data: dados.map((row: any) => row.incidencia),
            tension: 0.2
          }
        ]
      },
      options: {
        aspectRatio: 3,
        responsive: true,
        layout: {autoPadding: true},
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }

  carregaGraficoComposicaoPedidos(dados: any) {
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
          this.labelsComposPedidos.push({id: `cor-label${i + 1}`, label: dados[i].natureza_item});
        } else {
          outros += parseInt(dados[i].incidencia); 
        }
      }
    } else {
      for(let i = 0; i < registros; i++) {
          vals.push(parseInt(dados[i].incidencia));
          labels.push(dados[i].natureza_item);
      }
    }

    if(outros > 0) {
      vals.push(outros);
      labels.push('OUTROS');
      this.labelsComposPedidos.push({id: 'cor-label6', label: 'OUTROS'});
    }

    const data = {
      labels: labels,
      datasets: [{
        label: 'Itens solicitados',
        data: vals,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(125, 184, 48)',
          'rgb(114, 194, 207)',
          'rgb(151, 62, 214)'
        ],
        hoverOffset: 4
      }]
    };

    new Chart(this.graficoComposicaoPedidos.nativeElement, {
       type: 'doughnut',
       data: data,
       options: {
        layout: {autoPadding: true},
        aspectRatio: 1,
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
