import { Pipe, PipeTransform } from '@angular/core';
import { moneyObject } from './object.money.pipe';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(price: number, currency: string): string {
    const {
      prefix,
      multiplier,
      suffix,
    } = moneyObject[currency];
    return `${prefix} ${Math.floor(price * multiplier)} ${suffix}`;
  }

}
