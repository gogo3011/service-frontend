import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {BaseFilter} from "../../models/filters/base-filter";
import {BehaviorSubject, combineLatest, switchMap} from "rxjs";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  filter$: BehaviorSubject<BaseFilter> = new BehaviorSubject(new BaseFilter());
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  clients$ = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => this.beData.listUsers$(filter))
  );

  constructor(private beData: BeDataService) {
  }

  ngOnInit(): void {
  }
}
