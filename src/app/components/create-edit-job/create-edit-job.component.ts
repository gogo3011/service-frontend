import {Component, OnInit} from '@angular/core';
import {Job} from "../../models/job.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {RepairShop} from "../../models/repair-shop.model";
import {Car} from "../../models/car.model";
import {User} from "../../models/user.model";
import {Mechanic} from "../../models/mechanic.model";
import {JobStatus} from "../../models/enums/job-status.enum";
import {BeDataService} from "../../services/be-data/be-data.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-edit-job',
  templateUrl: './create-edit-job.component.html',
  styleUrls: ['./create-edit-job.component.css']
})
export class CreateEditJobComponent implements OnInit {
  job?: Job;
  repairShop?: RepairShop;

  readonly form = new FormGroup({
    id: new FormControl<MaybeEmpty<number>>(0),
    repairShop: new FormControl<MaybeEmpty<RepairShop>>(this.repairShop),
    vehicle: new FormGroup({
      registrationNumber: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(3)]),
      vin: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
      dateOfManufacturing: new FormControl<MaybeEmpty<Date>>(new Date(), Validators.required),
      color: new FormControl<MaybeEmpty<string>>('', Validators.required),
      car: new FormControl<MaybeEmpty<Car>>(null, Validators.required),
      owner: new FormControl<MaybeEmpty<User>>(null, Validators.required)
    }),
    mechanic: new FormControl<MaybeEmpty<Mechanic>>(null, Validators.required),
    started: new FormControl<MaybeEmpty<Date>>(new Date(), Validators.required),
    finished: new FormControl<MaybeEmpty<Date>>(new Date(), Validators.required),
    jobStatus: new FormControl<MaybeEmpty<JobStatus>>(JobStatus.OPEN, Validators.required)
  });

  constructor(private readonly beData: BeDataService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.job = this.config.data.job;
    this.repairShop = this.config.data.repairShop;
    if (this.job && !!this.job.id) {
      this.patchJob(this.job);
    }
  }

  patchJob(job: Job): void {
    this.form.controls.id.patchValue(job.id);
    this.form.controls.repairShop.patchValue(job.repairShop);
    this.form.controls.vehicle.controls.registrationNumber.patchValue(job.vehicle?.registrationNumber);
    this.form.controls.vehicle.controls.vin.patchValue(job.vehicle?.vin);
    this.form.controls.vehicle.controls.dateOfManufacturing.patchValue(new Date(job.vehicle?.dateOfManufacturing || ''));
    this.form.controls.vehicle.controls.color.patchValue(job.vehicle?.color);
    this.form.controls.vehicle.controls.car.patchValue(job.vehicle?.car);
    this.form.controls.vehicle.controls.owner.patchValue(job.vehicle?.owner);
    this.form.controls.mechanic.patchValue(job.mechanic);
    this.form.controls.started.patchValue(new Date(job.started || ''));
    this.form.controls.finished.patchValue(new Date(job.finished || ''));
    this.form.controls.jobStatus.patchValue(job.jobStatus);
  }
}
