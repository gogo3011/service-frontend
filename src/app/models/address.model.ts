import {BaseEntity} from "./base-entity.model";

export class Address extends BaseEntity {
  countryCode?: string | null;
  houseNumber?: string | null;
  city?: string | null;
  street?: string | null;
}
