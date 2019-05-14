import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(orders: Array<IOrder>, status: string): any {
    // tslint:disable-next-line:prefer-const
    let filteredOrders: Array<IOrder> = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status === status) {
        filteredOrders.push(orders[i]);
      }
    }
    console.log(filteredOrders);
    return filteredOrders;
  }

}
