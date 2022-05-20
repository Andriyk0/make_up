import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../system/services/product/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProductResponse } from '../../system/interfaces/product.interface';
import { OrderService } from '../../system/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public products: Array<IProductResponse>=[];

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.loadProductsByCategory();
      }
    })
  }

  ngOnInit(): void {}

  loadProductsByCategory(): void {
    const category = this.activatedRoute.snapshot.params['name'];
    this.productService.getAllByCategory(category).then(querySnapshot => {
      this.products = [];
      querySnapshot.forEach((doc) => {
        const prod = { ...doc.data(), id: doc.id }
        this.products.push(prod as IProductResponse);
      });
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
    this.orderService.changeBasket$.next(true);
    prod.count = 1;
  }

}
