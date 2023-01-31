import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {DialogService} from "primeng/dynamicdialog";
import {CreateEditClientComponent} from "../create-edit-client/create-edit-client.component";
import {CreateEditJobComponent} from "../create-edit-job/create-edit-job.component";

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.css'],
  providers: [DialogService]
})
export class ClientItemComponent implements OnInit {

  @Input()
  client!: User;

  constructor(private readonly dialogService: DialogService) {
  }

  ngOnInit(): void {

  }

  edit() {
    this.dialogService.open(CreateEditClientComponent, {
      header: 'Edit client information',
      width: '70%',
      data: this.client
    }).onClose.subscribe(res => {
      if (res) {
        this.client = res;
      }
    });
  }

  addJob() {
    this.dialogService.open(CreateEditJobComponent, {
      header: 'Create a job',
      width: '70%',
      data: {
        clientId: this.client.id
      }
    }).onClose.subscribe(res => {

    })
  }

}
