import { Component } from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Service';
  items: MenuItem[] = [
    {
      label: 'Repair Shops',
      icon: 'pi pi-wrench',
      routerLink: ['/repair-shops']
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {label: 'Delete', icon: 'pi pi-fw pi-trash'},
        {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      ]
    }
  ];

  constructor(private readonly primeNgConfig: PrimeNGConfig) {
    primeNgConfig.ripple = true
  }
}
