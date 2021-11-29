import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  public hide: boolean = true;
  private id: number = 0;
  public isEdit: boolean = false;

  constructor(
    private router: Router,
    private ticketsService: TicketsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('edit') != -1) {
      this.isEdit = true;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        const id = paramMap.get('id');
        this.findByIdUser(id);
      })
    } else
      this.isEdit = false;
  }

  public register() {
    if (!this.validatedForm()) {
      const register: User = {
        id: this.isEdit ? this.id : null,
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      };
      this.ticketsService
        .createUser(register)
        .subscribe(data => {
          alert(`Usuário(a) ${data.name} ${this.isEdit ? 'atualizado(a)' : 'cadastrado(a)'} com sucesso!`);
          this.router.navigate(['register/user']);
        },
          (error) => {
            alert(`Error ao cadastrar usuário(a) ${register.name}, tente novamente!`);
            console.log(error);
          })
    }
  }

  public validatedForm(): boolean {
    return this.name.invalid || this.email.invalid || this.password.invalid;
  }

  private findByIdUser(id: any) {
    this.id = id;
    this.ticketsService
      .findByIdUser(id)
      .subscribe(data => {
        this.name.setValue(data.name);
        this.email.setValue(data.email);
        this.password.setValue(data.password);
      },
        (error) => {
          alert('Usuário(a) não encontrado(a)');
          console.log(error);
          this.router.navigate(['register/user/add'])
        })
  }
}
