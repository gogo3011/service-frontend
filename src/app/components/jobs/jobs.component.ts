import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {DialogService} from "primeng/dynamicdialog";
import {BaseFilter} from "../../models/filters/base-filter";
import {BehaviorSubject, combineLatest, switchMap} from "rxjs";
import {CreateEditJobComponent} from "../create-edit-job/create-edit-job.component";
import {Job} from "../../models/job.model";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  providers: [DialogService]
})
export class JobsComponent implements OnInit {

  filter$ = new BehaviorSubject(new BaseFilter());
  refresh$ = new BehaviorSubject(true);

  jobs$ = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => this.beData.listJobs$(filter))
  );

  constructor(private readonly beData: BeDataService,
              private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  addJob(): void {
    this.dialogService.open(CreateEditJobComponent, {
      header: 'Schedule a job',
      width: '70%'
    }).onClose.subscribe((res) => {
      if (res) {
        this.refresh$.next(true);
      }
    });
  }

  editJob(job: Job): void {
    this.dialogService.open(CreateEditJobComponent, {
      header: 'Edit a job',
      width: '70%',
      data: {
        job: job
      }
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    })
  }

}
