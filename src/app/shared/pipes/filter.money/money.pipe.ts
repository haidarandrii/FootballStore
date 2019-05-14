import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(price: number, value: string): string {
    if (value === 'EUR') {
      return '€ ' + Math.floor(price * 0.87) + '.00';
    } else if (value === 'GRN') {
      return  price * 27 + ' грн';
     } else if (value === 'DOLLAR') {
       return '$ ' + price;
     } else if (value === 'GBP') {
       return '£ ' + Math.floor(price * 0.75) + '.00';
     }
  }

}
