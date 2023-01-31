import {Component, Input, OnInit} from '@angular/core';
import {BeDataService} from "../../services/be-data/be-data.service";
import {DialogService} from "primeng/dynamicdialog";
import {Car} from "../../models/car.model";
import {CreateEditCarComponent} from "../create-edit-car/create-edit-car.component";

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css'],
  providers: [DialogService]
})
export class CarItemComponent implements OnInit {

  @Input()
  car!: Car;

  constructor(private readonly beData: BeDataService, private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {

  }

  edit(): void {
    this.dialogService.open(CreateEditCarComponent, {
      header: 'Edit car entry',
      width: '70%',
      data: this.car
    }).onClose.subscribe(res => {
      if (res) {
        this.car = res;
      }
    });
  }

}
