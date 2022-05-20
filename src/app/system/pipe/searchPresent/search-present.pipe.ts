import { Pipe, PipeTransform } from '@angular/core';
import { IPresentResponse } from '../../interfaces/presents.interface';

@Pipe({
  name: 'searchPresent'
})
export class SearchPresentPipe implements PipeTransform {

  public presents: Array<IPresentResponse>=[];

  transform(value: Array<IPresentResponse>, searchAny:string): Array<IPresentResponse> {
    if(!value)return [];
    if(!searchAny) return value;
    return value.filter(item =>
      item.name.toLowerCase().includes(searchAny.toLowerCase()) ||
      item.price.toString().includes(searchAny.toString()))
  }

}
