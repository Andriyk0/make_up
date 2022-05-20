import { Pipe, PipeTransform } from '@angular/core';
import {IOrderResponse} from "../../interfaces/oredr.interface";

@Pipe({
  name: 'searchOrder'
})
export class SearchOrderPipe implements PipeTransform {

  public orders: Array<IOrderResponse>=[];

  transform(value: Array<IOrderResponse>, searchAny:string): Array<IOrderResponse> {
    if(!value)return [];
    if(!searchAny) return value;
    return value.filter(item =>
      item.firstName.toLowerCase().includes(searchAny.toLowerCase()) ||
      item.secondName.toString().includes(searchAny.toString()))
  }

}
