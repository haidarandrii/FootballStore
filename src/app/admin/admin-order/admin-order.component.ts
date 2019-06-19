import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { IOrder } from 'src/app/shared/interfaces/order';
import { STATUS_DELIVERED_ORDER, STATUS_CREATED_ORDER } from '../shared/constants';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  orderProducts: Array<IOrder> = [];
  statusCreated = STATUS_CREATED_ORDER;
  constructor(
    private adminOrderService: OrderAdminService,
  ) {}

  ngOnInit() {
    this.getProductsOrder();
  }
  public getProductsOrder(): void {
    this.adminOrderService.getJsonOrderProduct().subscribe(
      data => {
        this.orderProducts = data;
      }
    );
  }
  public confirm(orderProduct: IOrder): void {
    orderProduct.status = STATUS_DELIVERED_ORDER;
    this.adminOrderService.updateJsonOrder(orderProduct).subscribe(() => {
      this.getProductsOrder();
    }
    );
  }
}
