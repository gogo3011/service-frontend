import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {BeDataService} from "../../services/be-data/be-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaybeEmpty} from "../create-edit-repair-shop/create-edit-repair-shop.component";
import {Vehicle} from "../../models/vehicle.model";
import {Address} from "../../models/address.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-edit-client',
  templateUrl: './create-edit-client.component.html',
  styleUrls: ['./create-edit-client.component.css']
})
export class CreateEditClientComponent implements OnInit {
  client?: User;

  form = new FormGroup({
    id: new FormControl<MaybeEmpty<number>>(0),
    firstName: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
    vehicles: new FormControl<Vehicle[]>([]),
    address: new FormGroup({
      city: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
      countryCode: new FormControl<MaybeEmpty<string>>('', [Validators.required]),
      street: new FormControl<MaybeEmpty<string>>('', [Validators.required, Validators.minLength(2)]),
      houseNumber: new FormControl<MaybeEmpty<string>>(''),
    })
  });

  constructor(private readonly beData: BeDataService,  public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.client = this.config.data;
    if (this.client && !!this.client.id) {
      this.patchClient(this.client);
    }
  }

  patchClient(client: User) {
    this.form.controls.id.patchValue(client.id);
    this.form.controls.firstName.patchValue(client.firstName);
    this.form.controls.lastName.patchValue(client.lastName);
    this.form.controls.vehicles.patchValue(client.vehicles || []);
    this.form.controls.address.controls.city.patchValue(client.address?.city);
    this.form.controls.address.controls.countryCode.patchValue(client.address?.countryCode);
    this.form.controls.address.controls.street.patchValue(client.address?.street);
    this.form.controls.address.controls.houseNumber.patchValue(client.address?.houseNumber);
  }

  formToUser(): User {
    const user = new User();
    user.id = this.form.value.id || 0;
    user.firstName = this.form.value.firstName || '';
    user.lastName = this.form.value.lastName || '';
    const address = new Address();
    address.city = this.form.value.address?.city;
    address.countryCode = this.form.value.address?.countryCode;
    address.street = this.form.value.address?.street;
    address.houseNumber = this.form.value.address?.houseNumber;
    user.address = address;
    return user;
  }

  save() {
    if (this.form.valid) {
      this.beData.saveUser$(this.formToUser()).subscribe(res => {
        this.ref.close(res);
      })
    }
  }
}
