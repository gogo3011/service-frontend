import { Pipe, PipeTransform } from '@angular/core';
import {Model} from "../../models/model.model";

@Pipe({
  name: 'model'
})
export class ModelPipe implements PipeTransform {

  transform(value: Model | undefined, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return value.manufacturer?.name + ' ' + value.modelName + '[' + value.vehicleType + ']';
  }

}
