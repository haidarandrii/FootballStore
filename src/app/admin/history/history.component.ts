import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { IOrder } from 'src/app/shared/interfaces/order';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: Array<IOrder> = [];
  constructor(private orderService: OrderAdminService) { }

  ngOnInit() {
    this.getOrders();
  }
  public getOrders(): void {
    this.orderService.getJsonOrderProduct().subscribe(
      data => {
        this.orders = data;
        console.log(this.orders);
      },
      err => {
        console.log(err);
      }
    );
  }
}
