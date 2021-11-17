import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Show } from 'src/app/interfaces/show';
import { TicketsService } from 'src/app/services/tickets.service';
import { ShowBuy } from './../../../interfaces/show-buy';

@Component({
  selector: 'app-show-buy',
  templateUrl: './show-buy.component.html',
  styleUrls: ['./show-buy.component.scss']
})
export class ShowBuyComponent implements OnInit {

  private id: number = 0;
  public show!: Show;

  public nameFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public numberFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
  public validatedFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  public cvvFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
  public cpfFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = parseInt(data.id, 10);
      this.findByIdShow(this.id);
    })
  }


  private findByIdShow(id: number) {
    this.ticketsService
      .findByIdShow(id)
      .subscribe(data => {
        this.show = data;
      },
        (error) => {
          console.log(error);
        })
  }

  public buyShow() {
    if (!this.validatedForm()) {
      this.ticketsService
        .buyShow(this.valueForm())
        .subscribe(data => {
          if (data) {
            console.log('Compra finalizada');
            this.router.navigate(['show/finish', this.id]);
          } else
            console.log('Algo deu errado, tente novamente');
        },
          (error) => {
            console.log(error);
          })
    }
  }

  public validatedForm(): boolean {
    return this.nameFormControl.invalid ||
      this.numberFormControl.invalid ||
      this.validatedFormControl.invalid ||
      this.cvvFormControl.invalid ||
      this.cpfFormControl.invalid ||
      this.emailFormControl.invalid;
  }

  private valueForm() {
    const showBuy: ShowBuy = {
      id: null,
      idShow: this.id,
      name: this.nameFormControl.value,
      number: this.numberFormControl.value,
      validated: this.validatedFormControl.value,
      cvv: this.cvvFormControl.value,
      cpf: this.cpfFormControl.value,
      email: this.emailFormControl.value,
      moment: new Date()
    }
    return showBuy;
  }

}
