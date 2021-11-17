import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/interfaces/show';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-show-finish',
  templateUrl: './show-finish.component.html',
  styleUrls: ['./show-finish.component.scss']
})
export class ShowFinishComponent implements OnInit {

  private id: number = 0;
  public show!: Show;

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = parseInt(data.id, 10);
      this.findByIdShow(this.id);
    })
  }

  private findByIdShow(id: number) {
    this.ticketsService
      .findByIdShow(id)
      .subscribe(data => {
        this.show = data;
      },
        (error) => {
          console.log(error);
        })
  }

  public backToMenu() {
    this.router.navigate(['show']);
  }

}
