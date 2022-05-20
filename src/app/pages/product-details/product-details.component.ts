import { Component, OnInit } from '@angular/core';
import { IProductResponse} from '../../system/interfaces/product.interface';
import { ActivatedRoute} from '@angular/router';
import { ProductService} from '../../system/services/product/product.service';
import { OrderService} from '../../system/services/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public products !: IProductResponse;
  constructor(
    private productService : ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserOneAction()
  }

  getUserOneAction():void{
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productService.getOne(id).then(doc=>{
      this.products = { ...doc.data(), id: doc.id } as IProductResponse;
    })
  }

  productCount(products: IProductResponse, status: boolean):void {
    if(status){
      products.count++;
    }else if(!status && products.count > 1){
      products.count--;
    }
  }

  addBasket(products: IProductResponse):void {
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some((product:IProductResponse) => product.id === products.id)){
        const index = basket.findIndex((product:IProductResponse) => product.id === products.id);
        basket[index].count += products.count;
        this.toastr.success('Добавлено в корзину')
      }else{
        basket.push(products);
        this.toastr.success('Добавлено в корзину')
      }
    }else {
      basket.push(products);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    this.orderService.changeBasket$.next(true)
    products.count = 1;

  }
}
