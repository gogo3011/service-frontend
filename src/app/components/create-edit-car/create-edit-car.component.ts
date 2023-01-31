import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Car} from "../../models/car.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {Manufacturer} from "../../models/manufacturer.model";
import {VehicleType} from "../../models/enums/vehicle-type.model";
import {FuelType} from "../../models/enums/fuel-type.enum";
import {Model} from "../../models/model.model";
import {Engine} from "../../models/engine.model";
import {BaseFilter} from "../../models/filters/base-filter";
import {map, of} from "rxjs";
import {capitalizeFirstLetter} from "../../utils";

@Component({
  selector: 'app-create-edit-car',
  templateUrl: './create-edit-car.component.html',
  styleUrls: ['./create-edit-car.component.css']
})
export class CreateEditCarComponent implements OnInit {

  car?: Car;

  manufacturerOptions$ = this.beData.listManufacturers$({...new BaseFilter(), pageSize: 1000}).pipe(
    map((manufacturers) => manufacturers.map((man) => ({label: man.name, value: man})))
  );

  vehicleType$ = of(Object.values(VehicleType).map((key) => ({label: capitalizeFirstLetter(key), value: key})));
  fuelType$ = of(Object.values(FuelType).map((key) => ({label: capitalizeFirstLetter(key), value: key})));

  readonly form = new FormGroup({
    id: new FormControl<MaybeEmpty<number>>(0),
    model: new FormGroup({
      id: new FormControl<MaybeEmpty<number>>(0),
      manufacturer: new FormControl<MaybeEmpty<Manufacturer>>(null, [Validators.required]),
      modelName: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
      vehicleType: new FormControl<MaybeEmpty<VehicleType>>(null, [Validators.required]),
      startDate: new FormControl<MaybeEmpty<Date>>(new Date(), [Validators.required]),
      endDate: new FormControl<MaybeEmpty<Date>>(null),
    }),
    engine: new FormGroup({
      id: new FormControl<MaybeEmpty<number>>(0),
      manufacturer: new FormControl<MaybeEmpty<Manufacturer>>(null, [Validators.required]),
      name: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
      displacement: new FormControl<MaybeEmpty<number>>(null, [Validators.required]),
      fuelType: new FormControl<MaybeEmpty<FuelType>>(null, [Validators.required]),
      horsePower: new FormControl<MaybeEmpty<number>>(null, [Validators.required]),
    }),
    variant: new FormControl<MaybeEmpty<string>>(''),
  });

  constructor(private readonly beData: BeDataService, private readonly dialogRef: DynamicDialogRef, private readonly config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.car = this.config.data;
    if (this.car) {
      this.patchCarToForm(this.car);
    }
  }

  patchCarToForm(car: Car): void {
    this.form.controls.id.patchValue(car.id);
    this.form.controls.model.controls.id.patchValue(car.model?.id);
    this.form.controls.model.controls.manufacturer.patchValue(car.model?.manufacturer);
    this.form.controls.model.controls.modelName.patchValue(car.model?.modelName);
    this.form.controls.model.controls.vehicleType.patchValue(car.model?.vehicleType);
    this.form.controls.model.controls.startDate.patchValue(car.model?.startDate ? new Date(car.model?.startDate) : null);
    this.form.controls.model.controls.endDate.patchValue(car.model?.endDate ? new Date(car.model?.endDate) : null);
    this.form.controls.engine.controls.id.patchValue(car.engine?.id);
    this.form.controls.engine.controls.manufacturer.patchValue(car.engine?.manufacturer);
    this.form.controls.engine.controls.name.patchValue(car.engine?.name);
    this.form.controls.engine.controls.displacement.patchValue(car.engine?.displacement);
    this.form.controls.engine.controls.fuelType.patchValue(car.engine?.fuelType);
    this.form.controls.engine.controls.horsePower.patchValue(car.engine?.horsePower);
  }

  formToCar(): Car {
    const car = new Car();
    car.id = this.form.value.id || 0;
    const model = new Model();
    model.id = this.form.value.model?.id || 0;
    model.manufacturer = this.form.value.model?.manufacturer;
    model.modelName = this.form.value.model?.modelName || '';
    model.vehicleType = this.form.value.model?.vehicleType || undefined;
    model.startDate = new Date(this.form.value.model?.startDate || new Date());
    model.endDate = new Date(this.form.value.model?.endDate || new Date());
    car.model = model;
    const engine = new Engine();
    engine.id = this.form.value.engine?.id || 0;
    engine.name = this.form.value.engine?.name || '';
    engine.manufacturer = this.form.value.engine?.manufacturer || undefined;
    engine.displacement = this.form.value.engine?.displacement || undefined;
    engine.fuelType = this.form.value.engine?.fuelType || undefined;
    engine.horsePower = this.form.value.engine?.horsePower || undefined;
    car.engine = engine;
    return car;
  }

  save(): void {
    if (this.form.valid) {
      const car = this.formToCar();
      this.beData.saveCar$(car).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

}
