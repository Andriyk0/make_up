import { IProductResponse } from './product.interface';

export interface IOrderRequest{
  products:IProductResponse[];
  firstName:string;
  secondName:string;
  phone:string;
  email:string;
  city:string;
  street:string;
  house:string;
  status:string;
  totalPrice:number;
}

export interface IOrderResponse extends IOrderRequest{
  id:string;
}
