import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./pages/login/login/login.component";
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterUserListComponent } from './pages/register/register-user-list/register-user-list.component';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';
import { ShowBuyComponent } from "./pages/show/show-buy/show-buy.component";
import { ShowFinishComponent } from "./pages/show/show-finish/show-finish.component";
import { ShowListComponent } from "./pages/show/show-list/show-list.component";

export const options: Partial<IConfig | null> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
    validation: false,
};

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ShowListComponent,
        ShowBuyComponent,
        ShowFinishComponent,
        MenuComponent,
        RegisterUserComponent,
        RegisterUserListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxMaskModule.forRoot(maskConfig),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgxMaskModule.forRoot(),
        MatCardModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatCardModule,
        FlexLayoutModule,
        MatMenuModule,
        MatTableModule,
        MatTabsModule
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

