import { Component, Input, OnInit } from '@angular/core';
import { IProductResponse } from '../../system/interfaces/product.interface';
import { ProductService } from '../../system/services/product/product.service';
import { OrderService } from '../../system/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Array<IProductResponse>=[];

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }


  loadProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.products = data;

    })
  }

  addBasket(prod: IProductResponse):void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some((product:IProductResponse) => product.id === prod.id)){
        const index = basket.findIndex((product:IProductResponse) => product.id === prod.id);
        basket[index].count += prod.count;
        this.toastr.success('Добавлено в корзину')
      }else{
        basket.push(prod);
        this.toastr.success('Добавлено в корзину')
      }
    }else {
      basket.push(prod);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    this.orderService.changeBasket$.next(true)
    prod.count = 1;
  }




}
