import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenubarModule} from "primeng/menubar";
import { RepairShopsComponent } from './components/repair-shops/repair-shops.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataViewModule} from "primeng/dataview";
import { RepairShopItemComponent } from './components/repair-shop-item/repair-shop-item.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import { AddressPipe } from './pipes/address/address.pipe';
import {HttpClientModule} from "@angular/common/http";
import { CreateEditRepairShopComponent } from './components/create-edit-repair-shop/create-edit-repair-shop.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import { RepairShopDetailsComponent } from './components/repair-shop-details/repair-shop-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AccordionModule} from "primeng/accordion";
import { CreateEditJobComponent } from './components/create-edit-job/create-edit-job.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientItemComponent } from './components/client-item/client-item.component';
import { CreateEditClientComponent } from './components/create-edit-client/create-edit-client.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarItemComponent } from './components/car-item/car-item.component';
import { ModelPipe } from './pipes/model/model.pipe';
import { EnginePipe } from './pipes/engine/engine.pipe';
import { CreateEditCarComponent } from './components/create-edit-car/create-edit-car.component';
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import {TableModule} from "primeng/table";
import { RegisterVehicleComponent } from './components/register-vehicle/register-vehicle.component';
import { CreateEditMechanicComponent } from './components/create-edit-mechanic/create-edit-mechanic.component';
import { MechanicsComponent } from './components/mechanics/mechanics.component';
import {MultiSelectModule} from "primeng/multiselect";
import { JobsComponent } from './components/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    RepairShopsComponent,
    RepairShopItemComponent,
    AddressPipe,
    CreateEditRepairShopComponent,
    RepairShopDetailsComponent,
    LoadingComponent,
    CreateEditJobComponent,
    ClientsComponent,
    ClientItemComponent,
    CreateEditClientComponent,
    CarsComponent,
    CarItemComponent,
    ModelPipe,
    EnginePipe,
    CreateEditCarComponent,
    ClientDetailsComponent,
    RegisterVehicleComponent,
    CreateEditMechanicComponent,
    MechanicsComponent,
    JobsComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        DynamicDialogModule,
        HttpClientModule,
        MenubarModule,
        DataViewModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        ProgressSpinnerModule,
        AccordionModule,
        DropdownModule,
        CalendarModule,
        TableModule,
        MultiSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
