import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import {RepairShop} from "../../models/repair-shop.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {BaseFilter} from "../../models/filters/base-filter";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditRepairShopComponent} from "../create-edit-repair-shop/create-edit-repair-shop.component";

@Component({
  selector: 'app-repair-shops',
  templateUrl: './repair-shops.component.html',
  styleUrls: ['./repair-shops.component.css'],
  providers: [DialogService]
})
export class RepairShopsComponent implements OnInit {

  filter$: BehaviorSubject<BaseFilter> = new BehaviorSubject(new BaseFilter());
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  repairShops$: Observable<RepairShop[]> = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => {
      return this.beData.listRepairShops$(filter);
    })
  );

  constructor(private readonly beData: BeDataService, private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.dialogService.open(CreateEditRepairShopComponent, {
      header: 'New repair shop',
      width: '70%'
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    })
  }
}
