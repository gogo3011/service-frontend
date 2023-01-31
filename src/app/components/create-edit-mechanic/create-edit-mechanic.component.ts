import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {RepairShop} from "../../models/repair-shop.model";
import {Specialization} from "../../models/enums/specialization.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Mechanic} from "../../models/mechanic.model";
import {BaseFilter} from "../../models/filters/base-filter";
import {map, of} from "rxjs";
import {capitalizeFirstLetter} from "../../utils";

@Component({
  selector: 'app-create-edit-mechanic',
  templateUrl: './create-edit-mechanic.component.html',
  styleUrls: ['./create-edit-mechanic.component.css']
})
export class CreateEditMechanicComponent implements OnInit {

  mechanic?: Mechanic;

  repairShopOptions$ = this.beData.listRepairShops$({...new BaseFilter(), pageSize: 1000}).pipe(
    map(repairShops => repairShops.map(shop => ({label: shop.name, value: shop}))
  ));

  specializationOptions$ = of(Object.values(Specialization).map((key) =>
    ({label: capitalizeFirstLetter(key), value: key})));

  form = new FormGroup({
    firstName: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
    lastName: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
    age: new FormControl<MaybeEmpty<number>>(null, Validators.required),
    repairShop: new FormControl<MaybeEmpty<RepairShop>>(null, Validators.required),
    specializations: new FormControl<MaybeEmpty<Specialization[]>>([], Validators.required)
  });

  constructor(private readonly beData: BeDataService, private readonly dialogRef:DynamicDialogRef,
              private readonly dialogConfig: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.mechanic = this.dialogConfig.data;
    if (this.mechanic) {
      this.patchMechanicToForm(this.mechanic);
    }
  }

  patchMechanicToForm(mechanic: Mechanic): void {
    this.form.controls.firstName.patchValue(mechanic.firstName);
    this.form.controls.lastName.patchValue(mechanic.lastName);
    this.form.controls.age.patchValue(mechanic.age);
    this.form.controls.repairShop.patchValue(mechanic.repairShop);
    this.form.controls.specializations.patchValue(mechanic.specializations);
  }

  formToMechanic(): Mechanic {
    const mechanic = this.mechanic || new Mechanic();
    mechanic.firstName = this.form.value.firstName || '';
    mechanic.lastName = this.form.value.lastName || '';
    mechanic.age = this.form.value.age || 0;
    mechanic.repairShop = this.form.value.repairShop || undefined;
    mechanic.specializations = this.form.value.specializations || [];
    return mechanic;
  }

  save() {
    this.beData.saveMechanic$(this.formToMechanic()).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    });
  }


}
