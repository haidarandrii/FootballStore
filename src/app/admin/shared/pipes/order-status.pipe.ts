import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/order';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(orders: Array<IOrder>, status: string): any {
    return orders.filter(order => order.status === status);
  }
}
