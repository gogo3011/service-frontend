import { Pipe, PipeTransform } from '@angular/core';
import {Engine} from "../../models/engine.model";

@Pipe({
  name: 'engine'
})
export class EnginePipe implements PipeTransform {

  transform(value: Engine | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return value.name + ' ' + value.displacement + ' [' + value.fuelType + '] ';
  }

}
