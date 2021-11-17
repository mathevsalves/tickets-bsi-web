import { TicketsService } from './../../../services/tickets.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public phone: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]);

  public hide: boolean = true;

  constructor(
    private router: Router,
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
  }

  public register() {
    if (!this.validatedForm()) {
      const register: User = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        phone: this.phone.value
      };
      this.ticketsService
        .postRegister(register)
        .subscribe(data => {
          alert(`Usuário(a) ${data.name} cadastrado com sucesso!`);
          this.router.navigate(['login']);
        },
          (error) => {
            alert(`Error ao cadastrar usuário(a) ${register.name}, tente novamente!`);
            console.log(error);
          })
    }
  }

  public validatedForm(): boolean {
    return this.name.invalid || this.email.invalid || this.password.invalid || this.phone.invalid;
  }
}
