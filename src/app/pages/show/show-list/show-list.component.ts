import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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
        data.forEach(fe => {
          if (fe.photo != null) {
            let objectURL = 'data:image;base64,' + fe.photo;
            fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });
        this.shows = data;
      },
        (error) => {
          console.log(error);
        })
  }

}
