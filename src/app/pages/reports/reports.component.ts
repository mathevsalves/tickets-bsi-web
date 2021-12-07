import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public idReport: number = 0;

  public headers: string[] = [];
  public displayedColumns: string[] = [];
  public dataSource: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private notification: PoNotificationService,
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.idReport = parseInt(data.id, 10);
      this.getNotification(this.idReport);
    })
  }

  private getNotification(idReport: number) {
    if (idReport === 1) {
      this.ticketsService
        .findAllOrder()
        .subscribe(data => {
          this.dataSource = data.map(map => {
            const date = map.paymentMoment?.toString() as string;
            return {
              id: map.id,
              price: `R$ ${map.price?.toLocaleString('pt-BR', { currency: 'BRL' })}` as any,
              quantity: map.quantity,
              product: map.product?.name as any,
              paymentMoment: `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)} ${date.substr(11, 5)}` as any,
              total: `R$ ${map.total?.toLocaleString('pt-BR', { currency: 'BRL' })}` as any
            }
          });
          this.displayedColumns = ['id', 'price', 'quantity', 'product', 'paymentMoment', 'total'];
          this.headers = ['ID', 'PREÇO', 'QTD. COMPRA', 'SHOW', 'DATA DO PAGAMENTO', 'VALOR TOTAL'];
        },
          (error: HttpErrorResponse) => {
            this.notification.error('Erro ao carregar dados do relatório');
            console.log(error.error);
          })
    } else if (idReport == 2) {
      this.ticketsService
        .findDashboard()
        .subscribe(data => {
          this.dataSource = data.map(map => {
            const date = map.dateShow.toString();
            map.dateShow = `${date.substr(8, 2)}/${date.substr(5, 2)}/${date.substr(0, 4)} ${date.substr(11, 5)}` as any;
            map.totalValue = `R$ ${map.totalValue.toLocaleString('pt-BR', { currency: 'BRL' })}` as any;
            return map;
          });
          this.displayedColumns = ['name', 'address', 'dateShow', 'totalTickets', 'totalValue'];
          this.headers = ['NOME', 'ENDEREÇO', 'DATA DO SHOW', 'QTD. TOTAL DE INGRESSOS', 'VALOR TOTAL'];
        },
          (error: HttpErrorResponse) => {
            this.notification.error('Erro ao carregar dados do relatório');
            console.log(error.error);
          })
    } else if (idReport === 3) {
      this.ticketsService
        .findDashboardAddress()
        .subscribe(data => {
          this.dataSource = data.map(map => {
            map.totalValue = `R$ ${map.totalValue.toLocaleString('pt-BR', { currency: 'BRL' })}` as any;
            return map;
          });
          this.displayedColumns = ['address', 'totalShow', 'totalOrder', 'totalTickets', 'totalValue'];
          this.headers = ['CIDADE', 'TOTAL DE SHOWS', 'TOTAL DE COMPRA', 'QTD. TOTAL DE INGRESSOS', 'VALOR TOTAL'];
        },
          (error: HttpErrorResponse) => {
            this.notification.error('Erro ao carregar dados do relatório');
            console.log(error.error);
          })
    } else {
      this.notification.warning('Erro ao carregar o relatório');
    }
  }

}
