import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {BaseFilter} from "../../models/filters/base-filter";
import {BehaviorSubject, combineLatest, switchMap} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditClientComponent} from "../create-edit-client/create-edit-client.component";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [DialogService]
})
export class ClientsComponent implements OnInit {

  filter$: BehaviorSubject<BaseFilter> = new BehaviorSubject(new BaseFilter());
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  clients$ = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => this.beData.listUsers$(filter))
  );

  count$ = this.refresh$.pipe(
    switchMap(() => this.beData.countUsers$({...new BaseFilter(), pageSize: 0}))
  );

  constructor(private readonly beData: BeDataService, private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  add() {
    this.dialogService.open(CreateEditClientComponent, {
      header: 'Register a new client',
      width: '70%'
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    });
  }

  changedPage($event: any) {
    this.filter$.next({...new BaseFilter(), pageSize: $event.rows, pageNo: $event.first / $event.rows});
  }
}
