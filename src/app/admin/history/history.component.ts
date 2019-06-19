import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { IOrder } from 'src/app/shared/interfaces/order';
import { STATUS_DELIVERED_ORDER } from '../shared/constants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: Array<IOrder> = [];
  orderStatus = STATUS_DELIVERED_ORDER;
  constructor(
    private orderService: OrderAdminService,
  ) { }

  ngOnInit() {
    this.getOrders();
  }
  public getOrders(): void {
    this.orderService.getJsonOrderProduct().subscribe(
      data => {
        this.orders = data;
      }
    );
  }
}
