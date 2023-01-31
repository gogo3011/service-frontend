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
      icon: 'pi pi-box',
      routerLink: ['/repair-shops']
    },
    {
      label: 'Clients',
      icon: 'pi pi-user',
      routerLink: ['/clients']
    },
    {
      label: 'Cars',
      icon: 'pi pi-car',
      routerLink: ['/cars']
    },
    {
      label: 'Mechanics',
      icon: 'pi pi-prime',
      routerLink: ['/mechanics']
    },
    {
      label: 'Jobs',
      icon: 'pi pi-wrench',
      routerLink: ['/jobs']
    }
  ];

  constructor(private readonly primeNgConfig: PrimeNGConfig) {
    primeNgConfig.ripple = true
  }
}
