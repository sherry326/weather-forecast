import { Pipe, PipeTransform } from "@angular/core";
import {isDeepEmpty} from '../shared/utils/object.utils';

@Pipe({name: 'cityFilter'})
export class CityFilterPipe implements PipeTransform {
  transform(value: any[], exponent?: string): any {
    if (!isDeepEmpty(value)) {
      return value.filter(v => v.cityName.startsWith(exponent));
    }
  }
}
