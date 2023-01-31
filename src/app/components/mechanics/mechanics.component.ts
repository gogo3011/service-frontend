import {Component, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {BehaviorSubject, combineLatest, filter, switchMap} from "rxjs";
import {BaseFilter} from "../../models/filters/base-filter";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditMechanicComponent} from "../create-edit-mechanic/create-edit-mechanic.component";
import {Mechanic} from "../../models/mechanic.model";

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.css'],
  providers: [DialogService]
})
export class MechanicsComponent implements OnInit{

  filter$ = new BehaviorSubject(new BaseFilter());
  refresh$ = new BehaviorSubject(true);

  mechanics$ = combineLatest([this.filter$, this.refresh$]).pipe(
    switchMap(([filter, refresh]) => this.beData.listMechanics$(filter))
  );

  constructor(private readonly beData: BeDataService, private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {

  }

  registerMechanic(): void {
    this.dialogService.open(CreateEditMechanicComponent, {
      header: 'Register mechanic',
      width: '70%',
      data:{}
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    });
  }

  editMechanic(mechanic: Mechanic): void {
    this.dialogService.open(CreateEditMechanicComponent, {
      header: 'Register mechanic',
      width: '70%',
      data: mechanic
    }).onClose.subscribe(res => {
      if (res) {
        this.refresh$.next(true);
      }
    });
  }

}
