import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order';
import { Payment } from 'src/app/interfaces/payment';
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
  private quantity: number = 1;
  public show: Show | null = null;

  public nameFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  public numberFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
  public validatedFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  public cvvFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
  public cpfFormControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]);
  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private ticketsService: TicketsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = parseInt(data.id, 10);
      this.quantity = parseInt(data.quantity, 10);
      this.findByIdShow(this.id, this.quantity);
    })
  }

  private findByIdShow(id: number, quantity: number) {
    this.ticketsService
      .findByIdShow(id)
      .subscribe(data => {
        let objectURL = 'data:image;base64,' + data.photo;
        data.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        data.quantityBuy = quantity;
        this.show = data;
      },
        (error) => {
          console.log(error);
        })
  }

  public buyShow() {
    if (!this.validatedForm()) {
      const product: any = {
        id: this.show?.id,
        address: this.show?.address,
        dateShow: this.show?.dateShow,
        description: this.show?.description,
        name: this.show?.name,
        photo: null,
        price: this.show?.price
      }
      const payment: Payment = this.valueForm();
      const order: Order = {
        id: null,
        payment: payment,
        paymentMoment: null,
        price: this.show?.price,
        quantity: this.show?.quantityBuy,
        total: (this.show?.price as any) * (this.show?.quantityBuy as any),
        product: product
      }
      this.ticketsService
        .createOrder(order)
        .subscribe(data => {
          this.router.navigate(['show/finish', data.id]);
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

  private valueForm(): Payment {
    const validated: string = this.validatedFormControl.value.toString();
    const payment: Payment = {
      id: null,
      name: this.nameFormControl.value,
      number: this.numberFormControl.value,
      validated: `${validated.substr(0,2)}/${validated.substr(2,2)}`,
      cvv: this.cvvFormControl.value,
      cpf: this.cpfFormControl.value,
      email: this.emailFormControl.value
    }
    return payment;
  }

  public getTotal(show: Show | null): any {
    if (show != null)
      return show.quantityBuy * show.price;
  }

}
