import {BaseEntity} from "./base-entity.model";
import {Address} from "./address.model";
import {Vehicle} from "./vehicle.model";

export class User extends BaseEntity {
  username?: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  vehicles?: Vehicle[];
}
