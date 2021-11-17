import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { TicketsService } from 'src/app/services/tickets.service';

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
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
  }

  public login() {
    if (!this.validatedLogin()) {
      this.ticketsService
        .postLogin(this.dataLogin())
        .subscribe(data => {
          if (data) {
            // alert('Bem vindo(a) a aplicação!');
            this.router.navigate(['show']);
          }
          else
            alert('Email ou Senha incorretos!');
        },
          (error: HttpErrorResponse) => {
            console.log(error.error);
            alert('Erro ao tentar logar!');
          })

    }
  }

  public validatedLogin(): boolean {
    return this.email.invalid || this.password.invalid;
  }

  public register() {
    alert('vou para cadastre-se');
    this.router.navigate(['register']);
  }

  private dataLogin(): Login {
    return { email: this.email.value, password: this.password.value }
  }

}
