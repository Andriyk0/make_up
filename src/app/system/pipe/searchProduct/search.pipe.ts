import { Pipe, PipeTransform } from '@angular/core';
import { IProductResponse } from '../../interfaces/product.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public products: Array<IProductResponse>=[];

  transform(value: Array<IProductResponse>, searchAny:string): Array<IProductResponse> {
    if(!value)return [];
    if(!searchAny) return value;
    return value.filter(item =>
      item.name.toLowerCase().includes(searchAny.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchAny.toLowerCase()) ||
      item.price.toString().includes(searchAny.toString()))
  }

}
