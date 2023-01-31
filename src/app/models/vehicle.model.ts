import {BaseEntity} from "./base-entity.model";
import {Car} from "./car.model";
import {User} from "./user.model";

export class Vehicle extends BaseEntity {
  registrationNumber?: string;
  vin?: string;
  dateOfManufacturing?: Date;
  color?: string;
  car?: Car;
  owner?: User;
}
