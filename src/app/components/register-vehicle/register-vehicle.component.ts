import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {Car} from "../../models/car.model";
import {User} from "../../models/user.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Vehicle} from "../../models/vehicle.model";
import {map, Observable} from "rxjs";
import {BaseFilter} from "../../models/filters/base-filter";

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent implements OnInit {

  client?: User;
  vehicle?: Vehicle;

  carOptions$ = this.beData.listCars$({... new BaseFilter(), pageSize: 100}).pipe(
    map((cars) => cars.map(car => ({label: this.formatCarLabel(car), value: car})))
  );

  form = new FormGroup({
    registrationNumber: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
    vin: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
    dateOfManufacturing: new FormControl<MaybeEmpty<Date>>(new Date(), [Validators.required]),
    color: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
    car: new FormControl<MaybeEmpty<Car>>(undefined, [Validators.required])
  });

  constructor(private readonly beData: BeDataService, private readonly dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.client = this.config.data.client;
    this.vehicle = this.config.data.vehicle;
  }

  ngOnInit(): void {
    this.vehicle = this.config.data.vehicle;
    if (this.vehicle) {
      this.client = this.vehicle.owner;
    } else {
      this.client = this.config.data.client;
    }
    if (this.vehicle) {
      this.patchVehicleToForm(this.vehicle);
    }
  }


  patchVehicleToForm(vehicle: Vehicle): void {
    this.form.controls.registrationNumber.patchValue(vehicle.registrationNumber);
    this.form.controls.vin.patchValue(vehicle.vin);
    this.form.controls.dateOfManufacturing.patchValue(new Date(vehicle.dateOfManufacturing || new Date()));
    this.form.controls.color.patchValue(vehicle.color);
    this.form.controls.car.patchValue(vehicle.car);
  }

  formToVehicle(): Vehicle {
    const vehicle = new Vehicle();
    vehicle.registrationNumber = this.form.value.registrationNumber || '';
    vehicle.vin = this.form.value.vin || '';
    vehicle.dateOfManufacturing = this.form.value.dateOfManufacturing || new Date();
    vehicle.color = this.form.value.color || '';
    vehicle.car = this.form.value.car || undefined;
    vehicle.owner = this.client;
    return vehicle;
  }

  save(): void {
    this.beData.saveVehicle$(this.formToVehicle()).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    })
  }

  private formatCarLabel(car: Car): string {
    return car.model?.manufacturer?.name + ' ' + car.model?.modelName +
      ' [' + car.engine?.name + ' (' + car.engine?.displacement + ') ]';
  }
}
