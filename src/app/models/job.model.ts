import {BaseEntity} from "./base-entity.model";
import {Vehicle} from "./vehicle.model";
import {JobStatus} from "./enums/job-status.enum";
import {Mechanic} from "./mechanic.model";
import {RepairShop} from "./repair-shop.model";

export class Job extends BaseEntity {
  repairShop?: RepairShop;
  vehicle?: Vehicle;
  mechanic?: Mechanic;
  started?: string;
  finished?: string;
  jobStatus?: JobStatus;
}
