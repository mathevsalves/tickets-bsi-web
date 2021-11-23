import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowListComponent } from "./pages/show/show-list/show-list.component";
import { ShowBuyComponent } from "./pages/show/show-buy/show-buy.component";
import { ShowFinishComponent } from "./pages/show/show-finish/show-finish.component";
import { RegisterComponent } from "./pages/register/register/register.component";
import { LoginComponent } from "./pages/login/login/login.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'show', children: [
      { path: '', component: ShowListComponent },
      { path: 'buy/:id', component: ShowBuyComponent },
      { path: 'finish/:id', component: ShowFinishComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
