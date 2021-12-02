import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Show } from 'src/app/interfaces/show';
import { TicketsService } from 'src/app/services/tickets.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-register-show',
  templateUrl: './register-show.component.html',
  styleUrls: ['./register-show.component.scss']
})
export class RegisterShowComponent implements OnInit {

  public name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
  public photo: FormControl = new FormControl('', [Validators.required]);
  public address: FormControl = new FormControl('', [Validators.required]);
  public dateShow: FormControl = new FormControl('', [Validators.required]);
  public price: FormControl = new FormControl('', [Validators.required]);
  public description: FormControl = new FormControl('', [Validators.required]);

  public hide: boolean = true;
  private id: number = 0;
  public isEdit: boolean = false;
  public showImage: any;

  constructor(
    private router: Router,
    private ticketsService: TicketsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('edit') != -1) {
      this.isEdit = true;
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        const id = paramMap.get('id');
        this.findByIdShow(id);
      })
    } else
      this.isEdit = false;
  }

  public createShow() {
    if (!this.validatedForm()) {
      const show: Show = {
        id: this.isEdit ? this.id : null,
        name: this.name.value,
        photo: this.photo.value,
        address: this.address.value,
        dateShow: new Date(this.dateShow.value),
        price: this.price.value,
        description: this.description.value,
        quantityBuy: 0
      };

      this.ticketsService
        .createShow(show)
        .subscribe(data => {
          alert(`Show ${data.description} ${this.isEdit ? 'atualizado(a)' : 'cadastrado(a)'} com sucesso!`);
          this.router.navigate(['register/show']);
        },
          (error) => {
            alert(`Error ao cadastrar show ${show.description}, tente novamente!`);
            console.log(error);
          })
    }
  }

  public validatedForm(): boolean {
    return this.name.invalid ||
      this.photo.invalid ||
      this.address.invalid ||
      this.dateShow.invalid ||
      this.price.invalid ||
      this.description.invalid;
  }

  private findByIdShow(id: any) {
    this.id = id;
    this.ticketsService
      .findByIdShow(id)
      .subscribe(data => {
        this.name.setValue(data.name);
        let objectURL = 'data:image;base64,' + data.photo;
        this.showImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        this.address.setValue(data.address);
        this.dateShow.setValue(new Date(data.dateShow).toISOString().slice(0,16));
        this.price.setValue(data.price);
        this.description.setValue(data.description);
      },
        (error) => {
          alert('Show não encontrado');
          console.log(error);
          this.router.navigate(['register/show/add'])
        })
  }

  public selectButton() {
    const doc = document.getElementById('file')?.click();
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    this.photo.setValue(base64textString);
    let objectURL = 'data:image;base64,' + base64textString;
    this.showImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
