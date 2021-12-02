import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/interfaces/show';
import { User } from 'src/app/interfaces/user';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-register-show-list',
  templateUrl: './register-show-list.component.html',
  styleUrls: ['./register-show-list.component.scss']
})
export class RegisterShowListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'address', 'dateShow', 'photo', 'edit'];
  dataSource: Show[] = [];

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
      .findAllShows()
      .subscribe(data => {
        const dateNow = new Date();
        data.forEach(fe => {
          if (fe.photo != null) {
            let objectURL = 'data:image;base64,' + fe.photo;
            fe.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
          fe.edit = new Date(fe.dateShow).getTime() <= dateNow.getTime()

        });
        this.dataSource = data;
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        })
  }

  public alterShow(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  public createShow() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
