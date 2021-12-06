import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { Order } from 'src/app/interfaces/order';
import { Show } from 'src/app/interfaces/show';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-show-finish',
  templateUrl: './show-finish.component.html',
  styleUrls: ['./show-finish.component.scss']
})
export class ShowFinishComponent implements OnInit {

  private id: number = 0;
  public order: Order | null = null;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = parseInt(data.id, 10);
      this.findByIdOrder(this.id);
    })
  }

  private findByIdOrder(id: number) {
    this.ticketsService
      .findByIdOrder(id)
      .subscribe(data => {
        this.order = data;
      },
        (error) => {
          this.notification.error(`Erro ao carregar a tela!`);
          console.log(error);
        })
  }

  public backToMenu() {
    this.router.navigate(['show']);
  }

}
