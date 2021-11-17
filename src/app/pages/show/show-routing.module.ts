import { ShowListComponent } from './show-list/show-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowBuyComponent } from './show-buy/show-buy.component';
import { ShowFinishComponent } from './show-finish/show-finish.component';

const routes: Routes = [
  { path: '', component: ShowListComponent },
  { path: 'buy/:id', component: ShowBuyComponent },
  { path: 'finish/:id', component: ShowFinishComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule { }
