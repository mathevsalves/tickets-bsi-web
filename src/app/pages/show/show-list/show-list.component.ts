import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
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
  noImage = 'assets/img/no-image.png';

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private notification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.findAllShows();
  }

  private findAllShows() {
    // this.ticketsService
    //   .findAllShowsByDate(true)
    //   .subscribe(data => {
    //     data.forEach(fe => {
    //       if (fe.photo != null) {
    //         let objectURL = 'data:image;base64,' + fe.photo;
    //         fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //       }
    //     });
    //     this.showsPrevious = data;
    //   },
    //     (error) => {
    //       this.notification.warning(`Não há shows para serem exibidos!`);
    //       console.log(error);
    //     })

    // this.ticketsService
    //   .findAllShowsByDate(false)
    //   .subscribe(data => {
    //     data.forEach(fe => {
    //       if (fe.photo != null) {
    //         let objectURL = 'data:image;base64,' + fe.photo;
    //         fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    //       }
    //       fe.quantityBuy = 1;
    //     });
    //     this.showsNext = data;
    //   },
    //     (error) => {
    //       this.notification.warning(`Não há shows para serem exibidos!`);
    //       console.log(error);
    //     })

    this.ticketsService
      .findAllShows()
      .subscribe(data => {
        data.forEach(fe => {
          if (fe.photo != null) {
            let objectURL = 'data:image;base64,' + fe.photo;
            fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          fe.quantityBuy = 1;
        });
        this.showsNext = data.filter(filter => new Date(filter.dateShow).getTime() >= new Date().getTime());
        this.showsPrevious = data.filter(filter => new Date(filter.dateShow).getTime() < new Date().getTime());
      },
        (error) => {
          this.notification.warning(`Não há shows para serem exibidos!`);
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
