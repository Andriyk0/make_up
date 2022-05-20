import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from '../../../system/interfaces/oredr.interface';
import { OrderService } from '../../../system/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderListComponent implements OnInit {

  public displayedColumns: string[] = ['firstname', 'phone', 'address', 'products', 'totalPrice', 'actions'];
  public dataSource!: IOrderResponse[];
  public columnsToDisplay = ['firstname', 'phone', 'address', 'email', 'totalPrice', 'actions'];
  public expandedElement!: IOrderResponse | null;
  public searchOrder!: string;

  constructor(
    private oredrService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.oredrService.getAll().subscribe(data => {
      this.dataSource = data as IOrderResponse[];
      console.log(this.dataSource)
    })
  }

  deleteOrder(order: IOrderResponse): void {
    this.oredrService.delete(order.id).then(() => {
      this.loadOrders();
      this.toastr.success('Order successfully deleted');
    })
  }

}
