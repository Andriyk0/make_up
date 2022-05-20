import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from '../../system/interfaces/product.interface';
import { OrderService } from '../../system/services/order/order.service';
import { IOrderRequest } from '../../system/interfaces/oredr.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../system/services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public orderForm!: FormGroup;
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public visibility:boolean = true;
  public visible:boolean = false;
  public currentUser:any;

  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initOrderForm();
    this.loadBasket();
    this.loadUser();
  }

  initOrderForm():void{
    this.orderForm = this.fb.group({
      firstName:[null,Validators.required],
      secondName:[null,Validators.required],
      phone:[null,Validators.required],
      email:[null,Validators.required],
      city:[null,Validators.required],
      street:[null,Validators.required],
      house:[null,Validators.required],
    })
  }

  loadBasket():void{
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    }else{
      this.basket = [];
    }
    this.totalCount()
  }
  totalCount():void{
    this.total = this.basket.reduce((total:number,product:IProductResponse)=> total+ product.price * product.count,0);
  }

  createOrder():void {
      const order: IOrderRequest = {
        ...this.orderForm.value,
        products:this.basket,
        id:this.currentUser.id,
        status: 'PANDING',
        totalPrice:this.total,
      };
      this.orderService.create(order).then(()=>{
        this.basket = [];
        localStorage.removeItem('basket');
        this.orderService.changeBasket$.next(true);
        this.toastr.success('Ви зробили замовлення ')
      })
  }

  productCount(products: IProductResponse, status: boolean):void {
    if(status){
      products.count++;
    }else if(!status && products.count > 1){
      products.count--;
    }
    localStorage.setItem('basket',JSON.stringify(this.basket));
    this.orderService.changeBasket$.next(true);
    this.totalCount();
  }

  deleteBasketProduct(product: IProductResponse) {
    const index = this.basket.findIndex(prod=>prod.id === product.id);
    this.basket.splice(index,1);
    localStorage.setItem('basket',JSON.stringify(this.basket));
    this.orderService.changeBasket$.next(true);
    this.totalCount();
    this.toastr.success('Товар видалено')

  }

  visibilityOff():void{
    this.visibility = false;
    this.visible = true;
  }
  visibilityOn():void{
    this.visibility = true;
    this.visible = false;
  }



  loadUser():void{
    if(localStorage.length>0 && localStorage.getItem('users')){
      this.currentUser = JSON.parse(localStorage.getItem('users') as string);
      const id = this.currentUser.id;
      this.authService.getUserInfo(this.currentUser.id).subscribe(users=>{
        this.currentUser = { ...users,id:id };
        this.updateUserForm();
      })
    }else{
      this.currentUser = null;
    }
  }

  updateUserForm():void{
    this.orderForm.patchValue({
      email:this.currentUser.email,
      firstName:this.currentUser.firstName,
      secondName:this.currentUser.secondName,
      phone:this.currentUser.phone,
    })
  }



}
