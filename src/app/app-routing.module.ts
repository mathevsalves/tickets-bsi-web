import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from "./pages/login/login/login.component";
import { RegisterShowListComponent } from './pages/register/register-show-list/register-show-list.component';
import { RegisterShowComponent } from './pages/register/register-show/register-show.component';
import { RegisterUserListComponent } from './pages/register/register-user-list/register-user-list.component';
import { RegisterUserComponent } from './pages/register/register-user/register-user.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ShowBuyComponent } from "./pages/show/show-buy/show-buy.component";
import { ShowFinishComponent } from "./pages/show/show-finish/show-finish.component";
import { ShowListComponent } from "./pages/show/show-list/show-list.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'register', children: [
      {
        path: 'user', children: [
          { path: '', component: RegisterUserListComponent },
          { path: 'add', component: RegisterUserComponent },
          { path: 'edit/:id', component: RegisterUserComponent },
        ]
      },
      {
        path: 'show', children: [
          { path: '', component: RegisterShowListComponent },
          { path: 'add', component: RegisterShowComponent },
          { path: 'edit/:id', component: RegisterShowComponent },
        ]
      }
    ]
  },
  {
    path: 'show', children: [
      { path: '', component: ShowListComponent },
      { path: 'buy/:id/:quantity', component: ShowBuyComponent },
      { path: 'finish/:id', component: ShowFinishComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report/:id', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
