import { getLocaleNumberFormat } from '@angular/common';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit, Pipe } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoChartSerie } from '@po-ui/ng-components/lib/components/po-chart/interfaces/po-chart-serie.interface';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  charts = [
    {
      title: '',
      series: <PoChartSerie[]>[]
    },
    {
      title: '',
      series: <PoChartSerie[]>[]
    },
    {
      title: '',
      series: <PoChartSerie[]>[]
    },
    {
      title: '',
      series: <PoChartSerie[]>[]
    }
  ]

  constructor(
    private ticketsService: TicketsService,
    private notification: PoNotificationService
    ) { }

  ngOnInit(): void {
    this.findDashboard();
    this.findDashboardAddress();
  }

  private findDashboard() {
    this.ticketsService
      .findDashboard()
      .subscribe(data => {
        this.charts[0].series = data.sort((a, b) => a.totalValue < b.totalValue ? 1 : -1).map(map => <PoChartSerie>{ label: map.name.toUpperCase(), tooltip: `${map.name}: valor Total R$ ${map.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, data: map.totalValue });
        this.charts[0].title = `Total de ingressos vendidos: R$ ${data.reduce((acc, current) => acc += current.totalValue, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}`;

        this.charts[1].series = data.sort((a, b) => a.totalTickets < b.totalTickets ? 1 : -1).map(map => <PoChartSerie>{ label: map.name.toUpperCase(), tooltip: `${map.name}: total de ingressos ${map.totalTickets.toLocaleString('pt-BR')}`, data: map.totalTickets });
        this.charts[1].title = `Qtd. total de ingressos vendidos: ${data.reduce((acc, current) => acc += current.totalTickets, 0).toLocaleString('pt-BR')}`;

        this.charts[2].series = data.sort((a, b) => a.totalOrder < b.totalOrder ? 1 : -1).map(map => <PoChartSerie>{ label: map.name.toUpperCase(), tooltip: `${map.name}: total notas emitidas ${map.totalOrder.toLocaleString('pt-BR')}`, data: map.totalOrder });
        this.charts[2].title = `Qtd. total de compras finalizadas: ${data.reduce((acc, current) => acc += current.totalOrder, 0).toLocaleString('pt-BR')}`;
      },
        (error) => {
          this.notification.error('Erro ao carregar dados do dashboard!');
          console.log(error);
        })
  }

  private findDashboardAddress() {
    this.ticketsService
      .findDashboardAddress()
      .subscribe(data => {
        this.charts[3].series = data.map(map => <PoChartSerie>{ label: map.address.toUpperCase(), tooltip: `${map.address}: total de shows ${map.totalOrder.toLocaleString('pt-BR')}`, data: map.totalOrder });
        this.charts[3].title = `Qtd. total de shows por cidade ${data.reduce((acc, current) => acc += current.totalOrder, 0).toLocaleString('pt-BR')}`;
      },
        (error) => {
          this.notification.error('Erro ao carregar dados do dashboard!');
          console.log(error);
        })
  }

}
