import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../interfaces/product';

@Pipe({
  name: 'filterProduct'
})
export class FiltrProductPipe implements PipeTransform {
  arrayProduct: Array<IProduct> = [];
  transform(products: Array<IProduct>, category: string): Array<IProduct> {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === category) {
        this.arrayProduct.push(products[i]);
      }
    }
    return this.arrayProduct;
  }

}
