import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RepairShop} from "../../models/repair-shop.model";
import {Address} from "../../models/address.model";
import {Mechanic} from "../../models/mechanic.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

export type MaybeEmpty<T> = T | undefined | null;

@Component({
  selector: 'app-create-edit-repair-shop',
  templateUrl: './create-edit-repair-shop.component.html',
  styleUrls: ['./create-edit-repair-shop.component.css']
})
export class CreateEditRepairShopComponent implements OnInit {

  repairShop?: RepairShop;

  readonly form = new FormGroup({
    id: new FormControl<MaybeEmpty<number>>(0),
    name: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
    mechanics: new FormControl<Mechanic[]>([]),
    address: new FormGroup({
      city: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
      countryCode: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
      street: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
      houseNumber: new FormControl<MaybeEmpty<string>>(''),
    })
  });

  constructor(private readonly beData: BeDataService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.repairShop = this.config.data;
    if (this.repairShop && !!this.repairShop.id) {
      this.patchRepairShop(this.repairShop);
    }
  }

  patchRepairShop(repairShop: RepairShop): void {
    this.form.controls.id.patchValue(repairShop.id);
    this.form.controls.name.patchValue(repairShop.name);
    this.form.controls.mechanics.patchValue(repairShop.mechanics || []);
    this.form.controls.address.controls.city.patchValue(repairShop.address?.city);
    this.form.controls.address.controls.countryCode.patchValue(repairShop.address?.countryCode);
    this.form.controls.address.controls.street.patchValue(repairShop.address?.street);
    this.form.controls.address.controls.houseNumber.patchValue(repairShop.address?.houseNumber);
  }

  formToRepairShop(): RepairShop {
    const repairShop: RepairShop = new RepairShop();
    repairShop.id = this.form.value.id || 0;
    repairShop.name = this.form.value.name;
    const address = new Address();
    address.city = this.form.value.address?.city;
    address.countryCode = this.form.value.address?.countryCode;
    address.street = this.form.value.address?.street;
    address.houseNumber = this.form.value.address?.houseNumber;
    repairShop.address = address;
    return repairShop;
  }

  save() {
    if (this.form.valid) {
      const repairShop = this.formToRepairShop();
      this.beData.saveRepairShop$(repairShop).subscribe(res => {
        this.ref.close(res);
      });
    }
  }
}
