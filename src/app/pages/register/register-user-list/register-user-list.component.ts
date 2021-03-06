import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
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
    private route: ActivatedRoute,
    private notification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.findAllUsers();
  }

  private findAllUsers() {
    this.ticketsService
      .findAllUser()
      .subscribe(data => {
          this.dataSource = data;
      },
        (error: HttpErrorResponse) => {
          this.notification.error('Erro ao carregar a lista de usuários');
          console.log(error.error);
        })
  }

  public deleteByIdUser(id: number) {
    this.ticketsService
      .deleteByIdUser(id)
      .subscribe(data => {
        setTimeout(() => {
          this.findAllUsers();
          this.notification.success(`Usuário com o ID ${id} deletado com sucesso!`);
        }, 1000);
      },
        (error) => {
          this.notification.error(`Erro ao tentar deletar o usuário com o ID ${id}!`);
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
