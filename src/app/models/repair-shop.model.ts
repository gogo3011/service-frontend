import {BaseEntity} from "./base-entity.model";
import {Mechanic} from "./mechanic.model";
import {Manufacturer} from "./manufacturer.model";
import {Address} from "./address.model";

export class RepairShop extends BaseEntity {
  name?: string | null;
  mechanics?: Mechanic[];
  specializedInManufacturer?: Manufacturer;
  address?: Address;
}
