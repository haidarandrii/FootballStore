import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';

@Pipe({
  name: 'categoryImage'
})
export class CategoryImagePipe implements PipeTransform {
  constructor() {}
  transform(arrayProduct: Array<IProduct>, category: string): any {
    if (arrayProduct === undefined) {
      return arrayProduct;
    }
    const filteredProduct: Array<IProduct> = [];
    if (category === undefined) {
      return arrayProduct;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrayProduct.length; i++) {
      if (arrayProduct[i].category === category) {
        filteredProduct.push(arrayProduct[i]);
      }
    }
    return filteredProduct;
  }
}
