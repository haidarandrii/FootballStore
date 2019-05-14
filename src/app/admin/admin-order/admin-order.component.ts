import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from 'src/app/shared/services/order-admin.service';
import { IOrder } from 'src/app/shared/interfaces/order';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  orderProducts: Array<IOrder> = [];
  result: number;
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
        console.log(this.orderProducts);
        console.log(this.orderProducts);
      },
      err => {
        console.log(err);
      }
    );
  }
  public confirm(orderProduct: IOrder): void {
    orderProduct.status = 'delivered';
    this.adminOrderService.updateJsonOrder(orderProduct).subscribe(() => {
      this.getProductsOrder();
    }
    );
  }
}
