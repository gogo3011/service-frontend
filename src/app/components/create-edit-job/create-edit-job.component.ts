import {Component, OnInit} from '@angular/core';
import {Job} from "../../models/job.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {RepairShop} from "../../models/repair-shop.model";
import {Mechanic} from "../../models/mechanic.model";
import {JobStatus} from "../../models/enums/job-status.enum";
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Vehicle} from "../../models/vehicle.model";
import {Specialization} from "../../models/enums/specialization.model";
import {BaseFilter} from "../../models/filters/base-filter";
import {BehaviorSubject, combineLatest, filter, map, of, ReplaySubject, Subject, switchMap} from "rxjs";
import {capitalizeFirstLetter} from "../../utils";

@Component({
  selector: 'app-create-edit-job',
  templateUrl: './create-edit-job.component.html',
  styleUrls: ['./create-edit-job.component.css']
})
export class CreateEditJobComponent implements OnInit {
  job?: Job;

  userId: BehaviorSubject<any> = new BehaviorSubject(null);

  vehicleOptions$ =
    this.userId.pipe(
      filter(val => !!val),
      switchMap((userId) => this.beData.listVehiclesByUserId$(userId, {
        ...new BaseFilter(),
        pageSize: 100
      })),
      map((vehicles) => vehicles.map(vehicle =>
        ({label: vehicle.car?.model?.manufacturer?.name + ' ' + vehicle.car?.model?.modelName, value: vehicle})))
    );

  vehicleSelection$: BehaviorSubject<any> = new BehaviorSubject(null);
  repairShopOptions$ = this.vehicleSelection$.pipe(
    filter(val => !!val),
    switchMap((vehicle) =>
      this.beData.listRepairShopByManufacturerId$(vehicle.car?.model?.manufacturer?.id || 0, new BaseFilter())),
    map(repairShops => repairShops.map(shop => ({label: shop.name, value: shop})))
  );

  specializationOptions$ = of(Object.values(Specialization).map((key) =>
    ({label: capitalizeFirstLetter(key), value: key})));

  specializationSelection$: BehaviorSubject<any> = new BehaviorSubject(null);
  repairShopSelection$: BehaviorSubject<any> = new BehaviorSubject(null);

  mechanics$ = combineLatest([this.specializationSelection$, this.repairShopSelection$]).pipe(
    filter(([val1, val2]) => !!val1 && !!val2),
    switchMap(([specialization, repairShop]) =>
      this.beData.listByRepairShopIdAndSpecialization$(repairShop.id || 0, specialization, new BaseFilter())),
    map(mechanics => mechanics.map(mechanic => ({
      label: mechanic.firstName + ' ' + mechanic.lastName,
      value: mechanic
    })))
  );

  jobStatusOptions$ = of(Object.values(JobStatus).map((key) =>
    ({label: capitalizeFirstLetter(key), value: key})));

  readonly form = new FormGroup({
    vehicle: new FormControl<MaybeEmpty<Vehicle>>(null, Validators.required),
    jobType: new FormControl<MaybeEmpty<Specialization>>(null, Validators.required),
    repairShop: new FormControl<MaybeEmpty<RepairShop>>(null, Validators.required),
    mechanic: new FormControl<MaybeEmpty<Mechanic>>(null, Validators.required),
    started: new FormControl<MaybeEmpty<Date>>(new Date(), Validators.required),
    finished: new FormControl<MaybeEmpty<Date>>(null),
    status: new FormControl<MaybeEmpty<JobStatus>>(JobStatus.OPEN, Validators.required)
  });

  constructor(private readonly beData: BeDataService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.job = this.config.data.job;
    this.userId.next(this.job ? this.job.vehicle?.owner?.id : this.config.data.clientId);
    if (this.job) {
      this.patchJob(this.job);
      if (this.job.vehicle) {
        this.vehicleSelection$.next(this.job.vehicle);
      }
      if (this.job.repairShop) {
        this.repairShopSelection$.next(this.job.repairShop)
      }
      if (this.job.jobType) {
        this.specializationSelection$.next(this.job.jobType);
      }
    }
  }

  patchJob(job: Job): void {
    this.form.controls.repairShop.patchValue(job.repairShop);
    this.form.controls.jobType.patchValue(job.jobType);
    this.form.controls.vehicle.patchValue(job.vehicle);
    this.form.controls.mechanic.patchValue(job.mechanic);
    this.form.controls.started.patchValue(new Date(job.started || new Date()));
    this.form.controls.finished.patchValue(new Date(job.finished || new Date()));
    this.form.controls.status.patchValue(job.status);
  }

  formToJob(): Job {
    const job = this.job || new Job();
    job.vehicle = this.form.value.vehicle || undefined;
    job.jobType = this.form.value.jobType || undefined;
    job.mechanic = this.form.value.mechanic || undefined;
    job.vehicle = this.form.value.vehicle || undefined;
    job.started = this.form.value.started || undefined;
    job.finished = this.form.value.finished || undefined;
    job.status = this.form.value.status || undefined;
    job.repairShop = this.form.value.repairShop || undefined;
    return job;
  }

  save(): void {
    this.beData.saveJob$(this.formToJob()).subscribe(res => {
      if (res) {
        this.ref.close(res);
      }
    })
  }
}
