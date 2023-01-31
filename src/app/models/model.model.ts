import {BaseEntity} from "./base-entity.model";
import {Manufacturer} from "./manufacturer.model";
import {VehicleType} from "./enums/vehicle-type.model";

export class Model extends BaseEntity {
  manufacturer?: Manufacturer | null;
  modelName?: string;
  vehicleType?: VehicleType;
  startDate?: Date;
  endDate?: Date;
}
