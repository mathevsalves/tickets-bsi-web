import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/interfaces/show';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  shows: Show[] = [];

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllShows();
  }

  public buyShow(show: Show) {
    this.router.navigate(['buy', show.id], { relativeTo: this.route });
  }

  private findAllShows() {
    this.ticketsService
      .findAllShows()
      .subscribe(data => {
        this.shows = data;
      },
        (error) => {
          console.log(error);
        })
  }

}
