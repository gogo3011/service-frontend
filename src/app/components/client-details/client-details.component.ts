import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {BehaviorSubject, combineLatest, Observable, shareReplay, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {BaseFilter} from "../../models/filters/base-filter";
import {Vehicle} from "../../models/vehicle.model";
import {DialogService} from "primeng/dynamicdialog";
import {RegisterVehicleComponent} from "../register-vehicle/register-vehicle.component";

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  providers: [DialogService]
})
export class ClientDetailsComponent implements OnInit {
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

  client$: Observable<User> = combineLatest([this.queryParamId$, this.refresh$]).pipe(
    switchMap(([id, refresh]) => {
      return this.beData.loadUser$(id);
    }),
    shareReplay(1)
  );

  vehicles$: Observable<Vehicle[]> = combineLatest([this.queryParamId$, this.refresh$]).pipe(
    switchMap(([id, refresh]) => {
      return this.beData.listVehiclesByUserId$(id, new BaseFilter());
    }),
    shareReplay(1)
  );

  constructor(private readonly beData: BeDataService, private readonly route: ActivatedRoute,
              private readonly dialogService: DialogService) {
  }


  ngOnInit() {

  }

  registerVehicle(client: User) {
    this.dialogService.open(RegisterVehicleComponent, {
      header: 'Register vehicle',
      width: '70%',
      data: {
        client: client,
      }
    }).onClose.subscribe(res => {
      this.refresh$.next(true);
    });
  }

  editVehicle(vehicle: Vehicle, client: User) {
    this.dialogService.open(RegisterVehicleComponent, {
      data: {
        client: client,
        vehicle: vehicle,
        header: 'Edit registered vehicle',
        width: '70%',
      }
    }).onClose.subscribe(res => {
      this.refresh$.next(true);
    });
  }
}
