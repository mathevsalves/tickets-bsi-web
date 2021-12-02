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

  showsPrevious: Show[] = [];
  showsNext: Show[] = [];

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.findAllShows();
  }

  private findAllShows() {
    this.ticketsService
      .findAllShowsByDate(true)
      .subscribe(data => {
        data.forEach(fe => {
          if (fe.photo != null) {
            let objectURL = 'data:image;base64,' + fe.photo;
            fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });
        this.showsPrevious = data;
      },
        (error) => {
          console.log(error);
        })

    this.ticketsService
      .findAllShowsByDate(false)
      .subscribe(data => {
        data.forEach(fe => {
          if (fe.photo != null) {
            let objectURL = 'data:image;base64,' + fe.photo;
            fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          fe.quantityBuy = 1;
        });
        this.showsNext = data;
      },
        (error) => {
          console.log(error);
        })
  }

  public addItem(indexShow: number, add: boolean) {
    if (add) {
      if (this.showsNext[indexShow].quantityBuy < 5) {
        this.showsNext[indexShow].quantityBuy += 1;
      }
    } else {
      if (this.showsNext[indexShow].quantityBuy > 1)
        this.showsNext[indexShow].quantityBuy -= 1;
    }
  }

  public buyShow(show: Show) {
    this.router.navigate(['show/buy', show.id, show.quantityBuy]);
  }

}
