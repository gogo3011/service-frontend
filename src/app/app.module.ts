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
    ClientItemComponent
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
    AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
