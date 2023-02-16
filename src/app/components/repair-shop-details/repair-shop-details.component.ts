import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, combineLatest, combineLatestAll, EMPTY, Observable, shareReplay, switchMap} from "rxjs";
import {BeDataService} from "../../services/be-data/be-data.service";
import {RepairShop} from "../../models/repair-shop.model";
import {Job} from "../../models/job.model";
import {BaseFilter} from "../../models/filters/base-filter";
import {CreateEditJobComponent} from "../create-edit-job/create-edit-job.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-repair-shop-details',
  templateUrl: './repair-shop-details.component.html',
  styleUrls: ['./repair-shop-details.component.css'],
  providers: [DialogService]
})
export class RepairShopDetailsComponent implements OnInit {

  // @ts-ignore
  queryParamId$: Observable<number> = this.route.params.pipe(
    switchMap((queryParams) => {
      if (!!queryParams['id']) {
        return queryParams['id'];
      }
      return 0;
    })
  );

  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  repairShop$: Observable<RepairShop> = combineLatest([this.queryParamId$, this.refresh$]).pipe(
    switchMap(([id, refresh]) => {
      return this.beData.loadRepairShop$(id);
    }),
    shareReplay(1)
  );

  jobs$: Observable<Job[]> = combineLatest([this.queryParamId$, this.refresh$]).pipe(
    switchMap(([id, refresh]) => {
      return this.beData.listJobsByRepairShop$(id, new BaseFilter());
    }),
    shareReplay(1)
  );


  constructor(private readonly route: ActivatedRoute, private readonly beData: BeDataService,
              private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {
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
