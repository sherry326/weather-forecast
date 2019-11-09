import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'cityFilter'})
export class CityFilterPipe implements PipeTransform {
  transform(value: any[], exponent?: string): any {
     
    return value.filter(v => v.name.startsWith(exponent));
  }
}