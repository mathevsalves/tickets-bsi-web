import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from "./pages/login/login/login.component";
import { RegisterComponent } from "./pages/register/register/register.component";
import { ShowBuyComponent } from "./pages/show/show-buy/show-buy.component";
import { ShowFinishComponent } from "./pages/show/show-finish/show-finish.component";
import { ShowListComponent } from "./pages/show/show-list/show-list.component";
import { TicketsService } from "./services/tickets.service";

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            declarations: [
                AppComponent,
                LoginComponent,
                RegisterComponent,
                ShowListComponent,
                ShowBuyComponent,
                ShowFinishComponent
            ],
            providers: [TicketsService]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'tickets-bsi-web'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('tickets-bsi-web');
    });

});
