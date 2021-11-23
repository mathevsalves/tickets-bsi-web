import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./pages/login/login/login.component";
import { RegisterComponent } from "./pages/register/register/register.component";
import { ShowListComponent } from "./pages/show/show-list/show-list.component";
import { ShowBuyComponent } from "./pages/show/show-buy/show-buy.component";
import { ShowFinishComponent } from "./pages/show/show-finish/show-finish.component";
import { LoginRoutingModule } from "./pages/login/login-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RegisterRoutingModule } from "./pages/register/register-routing.module";
import { ShowRoutingModule } from "./pages/show/show-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDatepickerModule } from "@angular/material/datepicker";

export const options: Partial<IConfig | null> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
    validation: false,
};

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ShowListComponent,
        ShowBuyComponent,
        ShowFinishComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(maskConfig),
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RegisterRoutingModule,
        NgxMaskModule.forRoot(),
        ShowRoutingModule,
        MatCardModule,
        MatTooltipModule,
        MatDatepickerModule,

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

function localept(localept: any, arg1: string) {
    throw new Error('Function not implemented.');
}

