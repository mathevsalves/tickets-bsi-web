import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-register-user-list',
  templateUrl: './register-user-list.component.html',
  styleUrls: ['./register-user-list.component.scss']
})
export class RegisterUserListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'edit', 'delete'];
  dataSource: User[] = [];

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllUsers();
  }

  private findAllUsers() {
    this.ticketsService
      .findAllUser()
      .subscribe(data => {
        data.forEach(fe => {
          this.dataSource = data;
        });
      },
        (error) => {
          console.log(error);
        })
  }

  public deleteByIdUser(id: number) {
    this.ticketsService
      .deleteByIdUser(id)
      .subscribe(data => {
        setTimeout(() => {
          this.findAllUsers();
        }, 1000);
      },
        (error) => {
          console.log(error);
        })
  }

  public alterUser(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  public createUser() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
