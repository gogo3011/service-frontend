import { Pipe, PipeTransform } from '@angular/core';
import {Address} from "../../models/address.model";

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return (value.city || '') + ' (' + (value.countryCode || '') + '), ' +
      (value.street || '') + '' + (value.houseNumber || '');
  }

}
