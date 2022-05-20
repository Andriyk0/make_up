import { Component, OnInit } from '@angular/core';
import { IPresentResponse } from '../../system/interfaces/presents.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../system/services/order/order.service';
import { PresentService } from '../../system/services/present/present.service';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent implements OnInit {

  public present: Array<IPresentResponse>=[];

  constructor(
    private presentService: PresentService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadPresent();
  }

  loadPresent():void{
    this.presentService.getAll().subscribe(data=>{
      this.present = data;
    }, err=>{
      console.log("get all action",err)
    })
  }

  addBasket(pres: IPresentResponse):void {
    let basket: Array<IPresentResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some((present:IPresentResponse) => present.id === pres.id)){
        const index = basket.findIndex((present:IPresentResponse) => present.id === pres.id);
        basket[index].count += pres.count;
        this.toastr.success('Добавлено в корзину')
      }else{
        basket.push(pres);
        this.toastr.success('Добавлено в корзину')
      }
    }else {
      basket.push(pres);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    this.orderService.changeBasket$.next(true)
    pres.count = 1;
  }




}
