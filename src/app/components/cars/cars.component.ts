import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {CreateEditClientComponent} from "../create-edit-client/create-edit-client.component";
import {BehaviorSubject, combineLatest, switchMap} from "rxjs";
import {BaseFilter} from "../../models/filters/base-filter";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditCarComponent} from "../create-edit-car/create-edit-car.component";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [DialogService]
})
export class CarsComponent implements OnInit {

  filter$: BehaviorSubject<BaseFilter> = new BehaviorSubject(new BaseFilter());
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  cars$ = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => this.beData.listCars$(filter))
  );

  count$ = this.refresh$.pipe(
    switchMap(() => this.beData.countUsers$({...new BaseFilter(), pageSize: 0}))
  );

  constructor(private readonly beData: BeDataService, private readonly dialogService: DialogService) {
  }

  ngOnInit() {

  }

  add() {
    this.dialogService.open(CreateEditCarComponent, {
      header: 'Register a new car',
      width: '70%'
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    });
  }
}
