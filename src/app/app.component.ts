import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  showMenu: boolean = true;

  constructor(private ticketsService: TicketsService,
    private router: Router) { }

  ngOnInit() {
    this.verifyLogin();
  }

  ngOnChanges(): void {
    this.verifyLogin()
  }

  private verifyLogin() {
    const login = localStorage.getItem('login');
    if (login != null)
      this.showMenu = true;
    else {
      this.showMenu = false;
      this.router.navigate(['']);
    }
  }

}
