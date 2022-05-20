import { Component, OnInit } from '@angular/core';
import { IPresentResponse } from '../../system/interfaces/presents.interface';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../system/services/order/order.service';
import { PresentService } from '../../system/services/present/present.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-present-details',
  templateUrl: './present-details.component.html',
  styleUrls: ['./present-details.component.scss']
})
export class PresentDetailsComponent implements OnInit {

  public present !: IPresentResponse;

  constructor(
    private presentService: PresentService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserOnePresent();
  }

  getUserOnePresent():void{
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.presentService.getOne(id).then(doc=>{
      this.present = { ...doc.data(), id: doc.id } as IPresentResponse;
    })
  }

  presentCount(present: IPresentResponse, status: boolean):void {
    if(status){
      present.count++;
    }else if(!status && present.count > 1){
      present.count--;
    }
  }

  addBasket(present: IPresentResponse):void {
    let basket: Array<IPresentResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some((present:IPresentResponse) => present.id === present.id)){
        const index = basket.findIndex((present:IPresentResponse) => present.id === present.id);
        basket[index].count += present.count;
        this.toastr.success('Добавлено в корзину')
      }else{
        basket.push(present);
        this.toastr.success('Добавлено в корзину')
      }
    }else {
      basket.push(present);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    this.orderService.changeBasket$.next(true)
    present.count = 1;
  }




}
