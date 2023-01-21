import {BaseEntity} from "./base-entity.model";
import {Manufacturer} from "./manufacturer.model";
import {FuelType} from "./enums/fuel-type.enum";

export class Engine extends BaseEntity {
  manufacturer?: Manufacturer;
  name?: string;
  displacement?: number;
  fuelType?: FuelType;
  horsePower?: number;
}
