import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RepairShopsComponent} from "./components/repair-shops/repair-shops.component";
import {RepairShopDetailsComponent} from "./components/repair-shop-details/repair-shop-details.component";
import {ClientsComponent} from "./components/clients/clients.component";
import {CarsComponent} from "./components/cars/cars.component";
import {CreateEditCarComponent} from "./components/create-edit-car/create-edit-car.component";
import {ClientDetailsComponent} from "./components/client-details/client-details.component";
import {MechanicsComponent} from "./components/mechanics/mechanics.component";
import {JobsComponent} from "./components/jobs/jobs.component";

const routes: Routes = [
  {
    path: 'repair-shops',
    component: RepairShopsComponent
  }, {
    path: 'repair-shop-details/:id',
    component: RepairShopDetailsComponent
  }, {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'create-edit-car',
    component: CreateEditCarComponent
  },
  {
    path: 'client-details/:id',
    component: ClientDetailsComponent
  },
  {
    path: 'mechanics',
    component: MechanicsComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
