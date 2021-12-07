import { AppComponent } from './../../../app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { TicketsService } from 'src/app/services/tickets.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public hide: boolean = true;

  constructor(
    private router: Router,
    private ticketsService: TicketsService,
    private appComponent: AppComponent,
    private notification: PoNotificationService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('login')) {
      this.router.navigate(['dashboard']);
    } else
      this.appComponent.showMenu = false;
  }

  public login() {
    if (!this.validatedLogin()) {
      this.ticketsService
        .postLogin(this.dataLogin())
        .subscribe(data => {
          if (data) {
            this.notification.success('Bem vindo(a) a aplicação!');
            this.router.navigate(['dashboard']);
            localStorage.setItem('login', 'true');
            this.appComponent.showMenu = true;
          }
          else
            this.notification.warning('Email ou Senha incorretos!');

        },
          (error: HttpErrorResponse) => {
            console.log(error.error);
            this.notification.error('Erro ao tentar logar!')
          })

    }
  }

  public validatedLogin(): boolean {
    return this.email.invalid || this.password.invalid;
  }

  private dataLogin(): Login {
    return { email: this.email.value, password: this.password.value }
  }

}
