import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RepairShopsComponent} from "./components/repair-shops/repair-shops.component";
import {RepairShopDetailsComponent} from "./components/repair-shop-details/repair-shop-details.component";

const routes: Routes = [
  {
    path: 'repair-shops',
    component: RepairShopsComponent
  }, {
    path: 'repair-shop-details/:id',
    component: RepairShopDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
