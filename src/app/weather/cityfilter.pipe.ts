import { Pipe, PipeTransform } from "@angular/core";
import {isDeepEmpty} from '../shared/utils/object.utils';

@Pipe({name: 'cityFilter'})
export class CityFilterPipe implements PipeTransform {
  transform(value: any[], exponent?: string): any {
    if (!exponent) {
      return [];
    }
    if (!isDeepEmpty(value)) {

      return value.filter(v => {
        const cityName = v.cityName.toLowerCase();
        const filterstr = exponent.toLowerCase();
        return cityName.startsWith(filterstr);
      });
    }

    return [];
  }
}
