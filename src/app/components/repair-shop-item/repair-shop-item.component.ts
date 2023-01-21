import {Component, Input, OnInit} from '@angular/core';
import {RepairShop} from "../../models/repair-shop.model";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditRepairShopComponent} from "../create-edit-repair-shop/create-edit-repair-shop.component";

@Component({
  selector: 'app-repair-shop-item',
  templateUrl: './repair-shop-item.component.html',
  styleUrls: ['./repair-shop-item.component.css'],
  providers: [DialogService]
})
export class RepairShopItemComponent implements OnInit {

  @Input()
  repairShop!: RepairShop

  constructor(private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  edit() {
    this.dialogService.open(CreateEditRepairShopComponent, {
      header: 'Edit Repair Shop',
      width: '70%',
      data: this.repairShop
    }).onClose.subscribe(res => {
      if (res) {
        this.repairShop = res;
      }
    })
  }
}
