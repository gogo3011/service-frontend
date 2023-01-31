import {BaseEntity} from "./base-entity.model";
import {Specialization} from "./enums/specialization.model";
import {RepairShop} from "./repair-shop.model";

export class Mechanic extends BaseEntity {
  firstName?: string;
  lastName?: string;
  age?: number;
  repairShop?: RepairShop;
  specializations?: Specialization[];
}
